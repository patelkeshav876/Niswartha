/**
 * REST API for Orphanage Connect — MongoDB Atlas (Mongoose).
 * Run: MONGODB_URI=... node server/index.js
 */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';

dotenv.config({ path: new URL('../.env', import.meta.url) });
dotenv.config({ path: new URL('./.env', import.meta.url) });

const PORT = Number(process.env.PORT) || 4000;
const RAW_MONGODB_URI = (process.env.MONGODB_URI || '').trim();
const MONGODB_URI =
  RAW_MONGODB_URI.startsWith('mongodb://') || RAW_MONGODB_URI.startsWith('mongodb+srv://')
    ? RAW_MONGODB_URI
    : 'mongodb://127.0.0.1:27017/orphanage-connect';
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

const razorpay =
  RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET
    ? new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET })
    : null;

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: '2mb' }));

const generic = (name, coll) =>
  mongoose.model(
    name,
    new mongoose.Schema({}, { strict: false, collection: coll }),
  );

const User = generic('UserDoc', 'users');
const Ashram = generic('AshramDoc', 'ashrams');
const Need = generic('NeedDoc', 'needs');
const EventModel = generic('EventDoc', 'events');
const Post = generic('PostDoc', 'posts');
const Donation = generic('DonationDoc', 'donations');
const EventBooking = generic('EventBookingDoc', 'event_bookings');
const FavoriteSchema = new mongoose.Schema(
  { userId: { type: String, required: true, unique: true }, ashramIds: [String] },
  { collection: 'favorites' },
);
const Favorite = mongoose.models.FavoriteDoc || mongoose.model('FavoriteDoc', FavoriteSchema);

async function connectDb() {
  if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI');
    process.exit(1);
  }
  mongoose.set('strictQuery', false);
  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB connected');
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// --- Razorpay ---
app.post('/api/razorpay/order', async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(500).json({ error: 'Razorpay keys not configured on server' });
    }
    const { amount, currency, receipt, notes } = req.body || {};
    const rupees = Number(amount);
    if (!Number.isFinite(rupees) || rupees <= 0) {
      return res.status(400).json({ error: 'amount (in INR rupees) is required' });
    }
    const order = await razorpay.orders.create({
      amount: Math.round(rupees * 100), // paise
      currency: currency || 'INR',
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {},
    });
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

// --- Users ---
app.post('/api/users', async (req, res) => {
  try {
    const user = req.body;
    const id = user.id || `user-${Date.now()}`;
    const doc = { ...user, id };
    await User.findOneAndUpdate({ id }, doc, { upsert: true, new: true }).lean();
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const u = await User.findOne({ id: req.params.id }).lean();
    if (!u) return res.status(404).json({ error: 'User not found' });
    res.json(u);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const u = await User.findOne({ id: req.params.id }).lean();
    if (!u) return res.status(404).json({ error: 'User not found' });
    const updated = { ...u, ...req.body, id: req.params.id };
    await User.findOneAndUpdate({ id: req.params.id }, updated, { upsert: true }).lean();
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

// --- Ashrams ---
app.get('/api/ashrams', async (_req, res) => {
  try {
    const rows = await Ashram.find({}).lean();
    const list = rows.map((r) => {
      const { _id, ...rest } = r;
      return rest;
    });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.get('/api/ashrams/:id', async (req, res) => {
  try {
    const a = await Ashram.findOne({ id: req.params.id }).lean();
    if (!a) return res.status(404).json({ error: 'Ashram not found' });
    const { _id, ...rest } = a;
    res.json(rest);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.post('/api/ashrams', async (req, res) => {
  try {
    const ashram = req.body;
    const id = ashram.id || `ashram-${Date.now()}`;
    const doc = { ...ashram, id };
    await Ashram.findOneAndUpdate({ id }, doc, { upsert: true, new: true }).lean();
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.put('/api/ashrams/:id', async (req, res) => {
  try {
    const a = await Ashram.findOne({ id: req.params.id }).lean();
    if (!a) return res.status(404).json({ error: 'Ashram not found' });
    const { _id, ...rest } = a;
    const updated = { ...rest, ...req.body, id: req.params.id };
    await Ashram.findOneAndUpdate({ id: req.params.id }, updated, { upsert: true }).lean();
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

// --- Needs ---
app.get('/api/needs', async (req, res) => {
  try {
    const { ashramId } = req.query;
    const q = ashramId ? { ashramId } : {};
    const rows = await Need.find(q).lean();
    res.json(rows.map(({ _id, ...r }) => r));
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.get('/api/needs/:id', async (req, res) => {
  try {
    const n = await Need.findOne({ id: req.params.id }).lean();
    if (!n) return res.status(404).json({ error: 'Need not found' });
    const { _id, ...rest } = n;
    res.json(rest);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.post('/api/needs', async (req, res) => {
  try {
    const need = req.body;
    const id = need.id || `need-${Date.now()}`;
    const doc = {
      ...need,
      id,
      createdAt: need.createdAt || new Date().toISOString(),
    };
    await Need.findOneAndUpdate({ id }, doc, { upsert: true, new: true }).lean();
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.put('/api/needs/:id', async (req, res) => {
  try {
    const n = await Need.findOne({ id: req.params.id }).lean();
    if (!n) return res.status(404).json({ error: 'Need not found' });
    const { _id, ...rest } = n;
    const updated = { ...rest, ...req.body, id: req.params.id };
    await Need.findOneAndUpdate({ id: req.params.id }, updated, { upsert: true }).lean();
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.delete('/api/needs/:id', async (req, res) => {
  try {
    await Need.deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

// --- Events ---
app.get('/api/events', async (req, res) => {
  try {
    const { ashramId } = req.query;
    const q = ashramId ? { ashramId } : {};
    const rows = await EventModel.find(q).lean();
    res.json(rows.map(({ _id, ...r }) => r));
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.get('/api/events/:id', async (req, res) => {
  try {
    const ev = await EventModel.findOne({ id: req.params.id }).lean();
    if (!ev) return res.status(404).json({ error: 'Event not found' });
    const { _id, ...rest } = ev;
    res.json(rest);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const event = req.body;
    const id = event.id || `event-${Date.now()}`;
    const doc = { ...event, id };
    await EventModel.findOneAndUpdate({ id }, doc, { upsert: true, new: true }).lean();
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.put('/api/events/:id', async (req, res) => {
  try {
    const ev = await EventModel.findOne({ id: req.params.id }).lean();
    if (!ev) return res.status(404).json({ error: 'Event not found' });
    const { _id, ...rest } = ev;
    const updated = { ...rest, ...req.body, id: req.params.id };
    await EventModel.findOneAndUpdate({ id: req.params.id }, updated, { upsert: true }).lean();
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    await EventModel.deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

// --- Event bookings ---
app.get('/api/event-bookings', async (req, res) => {
  try {
    const { eventId, userId } = req.query;
    const q = {};
    if (eventId) q.eventId = eventId;
    if (userId) q.userId = userId;
    const rows = await EventBooking.find(Object.keys(q).length ? q : {}).lean();
    res.json(rows.map(({ _id, ...r }) => r));
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.get('/api/event-bookings/:id', async (req, res) => {
  try {
    const b = await EventBooking.findOne({ id: req.params.id }).lean();
    if (!b) return res.status(404).json({ error: 'Booking not found' });
    const { _id, ...rest } = b;
    res.json(rest);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.post('/api/event-bookings', async (req, res) => {
  try {
    const booking = req.body;
    const id = booking.id || `booking-${Date.now()}`;
    const doc = { ...booking, id };
    await EventBooking.findOneAndUpdate({ id }, doc, { upsert: true, new: true }).lean();
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.put('/api/event-bookings/:id', async (req, res) => {
  try {
    const b = await EventBooking.findOne({ id: req.params.id }).lean();
    if (!b) return res.status(404).json({ error: 'Booking not found' });
    const { _id, ...rest } = b;
    const updated = { ...rest, ...req.body, id: req.params.id };
    await EventBooking.findOneAndUpdate({ id: req.params.id }, updated, { upsert: true }).lean();
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.delete('/api/event-bookings/:id', async (req, res) => {
  try {
    await EventBooking.deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

// --- Posts ---
app.get('/api/posts', async (req, res) => {
  try {
    const { ashramId } = req.query;
    const q = ashramId ? { ashramId } : {};
    const rows = await Post.find(q).lean();
    res.json(rows.map(({ _id, ...r }) => r));
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const post = req.body;
    const id = post.id || `post-${Date.now()}`;
    const doc = {
      ...post,
      id,
      likes: post.likes || 0,
      createdAt: post.createdAt || new Date().toISOString(),
    };
    await Post.findOneAndUpdate({ id }, doc, { upsert: true, new: true }).lean();
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const p = await Post.findOne({ id: req.params.id }).lean();
    if (!p) return res.status(404).json({ error: 'Post not found' });
    const { _id, ...rest } = p;
    const updated = { ...rest, ...req.body, id: req.params.id };
    await Post.findOneAndUpdate({ id: req.params.id }, updated, { upsert: true }).lean();
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    await Post.deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.post('/api/posts/:id/like', async (req, res) => {
  try {
    const p = await Post.findOne({ id: req.params.id }).lean();
    if (!p) return res.status(404).json({ error: 'Post not found' });
    const { _id, ...rest } = p;
    const updated = { ...rest, likes: (rest.likes || 0) + 1 };
    await Post.findOneAndUpdate({ id: req.params.id }, updated, { upsert: true }).lean();
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

// --- Donations ---
async function applyDonationToNeed(needId, amount) {
  if (!needId || amount == null) return;
  const n = Number(amount);
  if (!Number.isFinite(n) || n <= 0) return;
  const need = await Need.findOne({ id: needId }).lean();
  if (!need) return;
  const { _id, ...nrest } = need;
  const reqTot = Number(nrest.quantityRequired) || 0;
  const prev = Number(nrest.quantityFulfilled) || 0;
  const next = prev + n;
  const qf = reqTot > 0 ? Math.min(reqTot, next) : next;
  await Need.findOneAndUpdate({ id: needId }, { ...nrest, quantityFulfilled: qf }, { upsert: true }).lean();
}

app.get('/api/donations', async (req, res) => {
  try {
    const { userId } = req.query;
    const q = userId ? { userId } : {};
    const rows = await Donation.find(q).lean();
    res.json(rows.map(({ _id, ...r }) => r));
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.post('/api/donations', async (req, res) => {
  try {
    const donation = req.body;
    const id = donation.id || `donation-${Date.now()}`;
    const doc = {
      ...donation,
      id,
      date: donation.date || new Date().toISOString(),
      status: donation.status || 'completed',
    };
    await Donation.findOneAndUpdate({ id }, doc, { upsert: true, new: true }).lean();

    if (donation.needId) {
      await applyDonationToNeed(donation.needId, donation.amount);
    }
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

/** Multiple need-specific donations in one checkout — one DB row per line */
app.post('/api/donations/batch', async (req, res) => {
  try {
    const { userId, ashramId, lines, date, status } = req.body || {};
    if (!userId || !ashramId || !Array.isArray(lines) || lines.length === 0) {
      return res.status(400).json({ error: 'userId, ashramId and non-empty lines[] are required' });
    }
    const baseDate = date || new Date().toISOString();
    const baseStatus = status || 'completed';
    const donations = [];
    let i = 0;
    for (const line of lines) {
      const amt = Number(line.amount);
      if (!line.needId || !Number.isFinite(amt) || amt <= 0) continue;
      const id = `donation-${Date.now()}-${i++}-${Math.random().toString(36).slice(2, 9)}`;
      const doc = {
        id,
        userId,
        ashramId,
        needId: line.needId,
        amount: amt,
        date: baseDate,
        status: baseStatus,
      };
      await Donation.findOneAndUpdate({ id }, doc, { upsert: true, new: true }).lean();
      await applyDonationToNeed(line.needId, amt);
      donations.push(doc);
    }
    if (donations.length === 0) {
      return res.status(400).json({ error: 'No valid donation lines' });
    }
    res.json({ donations });
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

// --- Favorites ---
app.get('/api/favorites', async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    const row = await Favorite.findOne({ userId }).lean();
    res.json(row?.ashramIds || []);
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.post('/api/favorites', async (req, res) => {
  try {
    const { userId, ashramId } = req.body;
    if (!userId || !ashramId) {
      return res.status(400).json({ error: 'userId and ashramId are required' });
    }
    let row = await Favorite.findOne({ userId }).lean();
    const list = row?.ashramIds || [];
    if (!list.includes(ashramId)) list.push(ashramId);
    await Favorite.findOneAndUpdate({ userId }, { userId, ashramIds: list }, { upsert: true }).lean();
    res.json({ success: true, favorites: list });
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

app.delete('/api/favorites', async (req, res) => {
  try {
    const userId = req.query.userId;
    const ashramId = req.query.ashramId;
    if (!userId || !ashramId) {
      return res.status(400).json({ error: 'userId and ashramId are required' });
    }
    const row = await Favorite.findOne({ userId }).lean();
    const list = (row?.ashramIds || []).filter((id) => id !== ashramId);
    await Favorite.findOneAndUpdate({ userId }, { userId, ashramIds: list }, { upsert: true }).lean();
    res.json({ success: true, favorites: list });
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

// --- Seed ---
app.post('/api/init-data', async (req, res) => {
  try {
    const data = req.body || {};
    if (data.users) {
      for (const user of data.users) {
        await User.findOneAndUpdate({ id: user.id }, user, { upsert: true }).lean();
      }
    }
    if (data.ashrams) {
      for (const ashram of data.ashrams) {
        await Ashram.findOneAndUpdate({ id: ashram.id }, ashram, { upsert: true }).lean();
      }
    }
    if (data.needs) {
      for (const need of data.needs) {
        await Need.findOneAndUpdate({ id: need.id }, need, { upsert: true }).lean();
      }
    }
    if (data.events) {
      for (const event of data.events) {
        await EventModel.findOneAndUpdate({ id: event.id }, event, { upsert: true }).lean();
      }
    }
    if (data.posts) {
      for (const post of data.posts) {
        await Post.findOneAndUpdate({ id: post.id }, post, { upsert: true }).lean();
      }
    }
    res.json({ success: true, message: 'Data initialized successfully' });
  } catch (e) {
    res.status(500).json({ error: String(e.message) });
  }
});

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });
