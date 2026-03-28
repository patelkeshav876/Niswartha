function getApiBase(): string {
  const raw = import.meta.env.VITE_API_URL;
  if (raw != null && String(raw).trim() !== '') {
    return String(raw).replace(/\/$/, '');
  }
  return '/api';
}

const API_BASE = getApiBase();

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { requireAuth: _requireAuth = false, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`API Error [${endpoint}]:`, error);
    throw new Error(error || `API request failed: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  health: () => fetchAPI<{ status: string }>('/health'),

  createUser: (data: Record<string, unknown>) =>
    fetchAPI('/users', { method: 'POST', body: JSON.stringify(data) }),
  getUser: (id: string) => fetchAPI(`/users/${id}`),
  updateUser: (id: string, data: Record<string, unknown>) =>
    fetchAPI(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  getAshrams: () => fetchAPI('/ashrams'),
  getAshram: (id: string) => fetchAPI(`/ashrams/${id}`),
  createAshram: (data: Record<string, unknown>) =>
    fetchAPI('/ashrams', { method: 'POST', body: JSON.stringify(data) }),
  updateAshram: (id: string, data: Record<string, unknown>) =>
    fetchAPI(`/ashrams/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  getNeeds: (ashramId?: string) =>
    fetchAPI(ashramId ? `/needs?ashramId=${encodeURIComponent(ashramId)}` : '/needs'),
  getNeed: (id: string) => fetchAPI(`/needs/${id}`),
  createNeed: (data: Record<string, unknown>) =>
    fetchAPI('/needs', { method: 'POST', body: JSON.stringify(data) }),
  updateNeed: (id: string, data: Record<string, unknown>) =>
    fetchAPI(`/needs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteNeed: (id: string) => fetchAPI(`/needs/${id}`, { method: 'DELETE' }),

  getEvents: (ashramId?: string) =>
    fetchAPI(ashramId ? `/events?ashramId=${encodeURIComponent(ashramId)}` : '/events'),
  getEvent: (id: string) => fetchAPI(`/events/${id}`),
  createEvent: (data: Record<string, unknown>) =>
    fetchAPI('/events', { method: 'POST', body: JSON.stringify(data) }),
  updateEvent: (id: string, data: Record<string, unknown>) =>
    fetchAPI(`/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteEvent: (id: string) => fetchAPI(`/events/${id}`, { method: 'DELETE' }),

  getEventBookings: (opts?: { eventId?: string; userId?: string }) => {
    const params = new URLSearchParams();
    if (opts?.eventId) params.set('eventId', opts.eventId);
    if (opts?.userId) params.set('userId', opts.userId);
    const q = params.toString();
    return fetchAPI(q ? `/event-bookings?${q}` : '/event-bookings');
  },
  getEventBooking: (id: string) => fetchAPI(`/event-bookings/${id}`),
  createEventBooking: (data: Record<string, unknown>) =>
    fetchAPI('/event-bookings', { method: 'POST', body: JSON.stringify(data) }),
  updateEventBooking: (id: string, data: Record<string, unknown>) =>
    fetchAPI(`/event-bookings/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteEventBooking: (id: string) => fetchAPI(`/event-bookings/${id}`, { method: 'DELETE' }),

  getPosts: (ashramId?: string) =>
    fetchAPI(ashramId ? `/posts?ashramId=${encodeURIComponent(ashramId)}` : '/posts'),
  createPost: (data: Record<string, unknown>) =>
    fetchAPI('/posts', { method: 'POST', body: JSON.stringify(data) }),
  updatePost: (id: string, data: Record<string, unknown>) =>
    fetchAPI(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePost: (id: string) => fetchAPI(`/posts/${id}`, { method: 'DELETE' }),
  likePost: (id: string) => fetchAPI(`/posts/${id}/like`, { method: 'POST' }),

  getDonations: (userId?: string) =>
    fetchAPI(userId ? `/donations?userId=${encodeURIComponent(userId)}` : '/donations'),
  createDonation: (data: Record<string, unknown>) =>
    fetchAPI('/donations', { method: 'POST', body: JSON.stringify(data) }),
  createDonationsBatch: (data: Record<string, unknown>) =>
    fetchAPI('/donations/batch', { method: 'POST', body: JSON.stringify(data) }),

  createRazorpayOrder: (data: Record<string, unknown>) =>
    fetchAPI('/razorpay/order', { method: 'POST', body: JSON.stringify(data) }),

  getFavorites: (userId: string) =>
    fetchAPI(`/favorites?userId=${encodeURIComponent(userId)}`),
  addFavorite: (userId: string, ashramId: string) =>
    fetchAPI('/favorites', { method: 'POST', body: JSON.stringify({ userId, ashramId }) }),
  removeFavorite: (userId: string, ashramId: string) =>
    fetchAPI(
      `/favorites?userId=${encodeURIComponent(userId)}&ashramId=${encodeURIComponent(ashramId)}`,
      { method: 'DELETE' },
    ),

  initData: (payload: Record<string, unknown>) =>
    fetchAPI('/init-data', { method: 'POST', body: JSON.stringify(payload) }),
};
