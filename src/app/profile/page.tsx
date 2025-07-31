'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [isLogin, setIsLogin] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const remembered = localStorage.getItem('rememberedUser');
    if (remembered) {
      const { email } = JSON.parse(remembered);
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === email);
      if (user) setCurrentUser(user);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (isLogin) {
      const user = users.find((u: any) => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('rememberedUser', JSON.stringify({ email: user.email }));
        setMessage(`Welcome back, ${user.name}! Redirecting...`);
        setTimeout(() => router.push('/'), 1000);
      } else {
        setMessage('Invalid email or password.');
      }
    } else {
      if (users.some((u: any) => u.email === email)) {
        setMessage('Email already registered.');
        return;
      }
      users.push({ name, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      setMessage('Account created successfully! You can now log in.');
      setIsLogin(true);
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  const handleForgotPassword = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email);
    if (user) {
      setMessage(`Your password is: ${user.password}`);
    } else {
      setMessage('No account found with that email.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rememberedUser');
    setCurrentUser(null);
    setIsEditing(false);
    router.push('/');
  };

  const handleEditSave = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: any) =>
      u.email === currentUser.email ? { name, email, password } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('rememberedUser', JSON.stringify({ email }));
    setCurrentUser({ name, email, password });
    setIsEditing(false);
    setMessage('Profile updated successfully!');
  };

  const backgroundImage = '/images/your-background.png';

  const cardStyle: React.CSSProperties = {
    width: '450px',
    minHeight: '600px',
    margin: '3rem auto',
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  };

  const headerImageStyle: React.CSSProperties = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };

  const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  };

  // Login / Sign Up
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <img src={backgroundImage} alt="Header" style={headerImageStyle} />
        <h1 style={{ color: '#4A7C59', margin: '1.5rem 0', fontSize: '2rem' }}>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            padding: '0 2rem 2rem',
            flexGrow: 1,
            justifyContent: 'center',
          }}
        >
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%' }}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%' }}
          />
          <button
            type="submit"
            style={{
              padding: '1rem',
              backgroundColor: '#4A7C59',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '1rem',
            }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p style={{ marginTop: '0.5rem', color: '#4A5A4A' }}>{message}</p>
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
          <button
            onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
            style={{ background: 'none', border: 'none', color: '#4A7C59', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isLogin ? 'Create an account' : 'Already have an account? Login'}
          </button>
          {isLogin && (
            <button
              onClick={handleForgotPassword}
              style={{ background: 'none', border: 'none', color: '#4A7C59', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Forgot Password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
