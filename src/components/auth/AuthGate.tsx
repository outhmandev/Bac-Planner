import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { usePlanner } from '../../context/PlannerContext';

export const AuthGate: React.FC = () => {
  const { login, register } = usePlanner();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await login({ email, password });
        if (!res.success) {
          setError(res.error || 'Failed to sign in. Please verify your credentials.');
        }
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }
        const res = await register({ name, email, password, confirmPassword });
        if (!res.success) {
          setError(res.error || 'Failed to register account.');
        }
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setError(null);
    setLoading(true);
    try {
      // Try login demo first
      const demoCreds = { email: 'demo@blushplanner.local', password: 'Password123' };
      const loginRes = await login(demoCreds);
      if (!loginRes.success) {
        // If demo user doesn't exist yet, register it
        await register({
          name: 'Demo Student',
          email: demoCreds.email,
          password: demoCreds.password
        });
      }
    } catch {
      setError('Could not initialize demo account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-viewport">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo-badge">
            <Sparkles size={14} />
            <span>Blush Planner</span>
          </div>
          <h1 className="auth-title">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <p className="auth-subtitle">
            {mode === 'login' 
              ? 'Access your private Bac 2027, German & Projects workspace' 
              : 'Start your personal life & academic command center today'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="auth-tabs-pill">
          <button 
            type="button"
            className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setError(null); }}
          >
            Sign In
          </button>
          <button 
            type="button"
            className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
            onClick={() => { setMode('register'); setError(null); }}
          >
            Create Account
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <div className="auth-error-banner">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="auth-input-wrapper">
                <UserIcon size={16} className="auth-input-icon" />
                <input 
                  type="text" 
                  className="auth-input" 
                  placeholder="e.g. Mohammed Amine"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={16} className="auth-input-icon" />
              <input 
                type="email" 
                className="auth-input" 
                placeholder="you@domain.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus={mode === 'login'}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="auth-input-wrapper">
              <Lock size={16} className="auth-input-icon" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="auth-input" 
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                minLength={6}
                required
              />
              <button 
                type="button" 
                className="auth-input-toggle" 
                onClick={() => setShowPassword(p => !p)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="auth-input-wrapper">
                <Lock size={16} className="auth-input-icon" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="auth-input" 
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="auth-submit-btn" 
            disabled={loading}
          >
            <span>{loading ? 'Processing...' : (mode === 'login' ? 'Sign In to Planner' : 'Complete Registration')}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Demo Shortcut */}
        <div className="auth-divider">
          <span>Or test with demo</span>
        </div>

        <button 
          type="button" 
          className="auth-demo-btn" 
          onClick={handleQuickDemo}
          disabled={loading}
        >
          <Sparkles size={14} />
          <span>One-Click Demo Student Access</span>
        </button>

        {/* Footer Security Note */}
        <div className="auth-footer-info">
          <ShieldCheck size={14} />
          <span>Each account has isolated, private local data.</span>
        </div>
      </div>
    </div>
  );
};
