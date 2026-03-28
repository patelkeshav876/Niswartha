import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Link, useNavigate } from 'react-router';
import { cn } from '../lib/utils';
import { Mail, Lock, EyeOff, UserRound } from 'lucide-react';

export function Login() {
  const [role, setRole] = useState<'donor' | 'admin'>('donor');
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-10">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/45" />
      </div>

      <div className="relative w-full max-w-sm rounded-[32px] border border-white/35 bg-white/12 p-6 shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl text-white">
        <h1 className="text-4xl font-serif font-bold mb-1">Login</h1>
        <p className="text-white/80 text-sm mb-6">Welcome back, login to your account</p>

        <div className="flex space-x-2 mb-4 bg-black/20 p-1 rounded-lg border border-white/15">
          <button
            onClick={() => setRole('donor')}
            className={cn(
              'flex-1 py-2 text-sm font-medium rounded-md transition-colors',
              role === 'donor' ? 'bg-white text-zinc-900 shadow-sm' : 'text-white/80 hover:bg-white/15',
            )}
            type="button"
          >
            Donor
          </button>
          <button
            onClick={() => setRole('admin')}
            className={cn(
              'flex-1 py-2 text-sm font-medium rounded-md transition-colors',
              role === 'admin' ? 'bg-white text-zinc-900 shadow-sm' : 'text-white/80 hover:bg-white/15',
            )}
            type="button"
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-white/70" />
            <Input
              type="email"
              placeholder="you@example.com"
              required
              className="pl-10 h-12 bg-black/20 border-white/35 text-white placeholder:text-white/60"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-white/70" />
            <EyeOff className="absolute right-3 top-3.5 h-4 w-4 text-white/70" />
            <Input
              type="password"
              placeholder="••••••••"
              required
              className="pl-10 pr-10 h-12 bg-black/20 border-white/35 text-white placeholder:text-white/60"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-white/85">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-white/40 bg-black/20 accent-lime-400"
            />
            Remember me
          </label>

          <Button
            type="submit"
            className="w-full text-lg h-12 border-0 bg-gradient-to-r from-lime-400 to-emerald-500 text-zinc-950 hover:from-lime-300 hover:to-emerald-400 shadow-lg"
          >
            Login
          </Button>
        </form>

        <div className="mt-5 text-center text-sm text-white/80">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-semibold text-white hover:underline inline-flex items-center gap-1">
            Signup <UserRound className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}