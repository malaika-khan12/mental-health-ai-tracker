export default function Home() {
  return (
    <div>
      {/* Top Section - Take Some Time Off */}
      <section
        style={{
          backgroundColor: '#E6F0E6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '3rem 2rem',
          borderRadius: '12px',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '2rem',
        }}
      >
        <img
          src="/images/take-time-off.png"
          alt="Relaxed illustration"
          style={{ maxWidth: '400px', width: '100%', borderRadius: '12px' }}
        />
        <div style={{ flex: '1 1 300px', textAlign: 'right' }}>
          <h2 style={{ color: '#2F4F2F', fontSize: '2.5rem', marginBottom: '1rem' }}>
            Take Some <span style={{ color: '#6BAF92' }}>Time Off</span>
          </h2>
          <p style={{ color: '#4A5A4A', marginBottom: '1.5rem' }}>
            Your mental well-being matters. Relax, reflect, and recharge with MindEase.
          </p>
          <a href="/about" className="btn-primary">
            Read More
          </a>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to MindEase</h1>
        <p>
          Your AI-powered companion to track moods, understand your mental health,
          and improve overall well-being.
        </p>

        <img
          src="/images/yoga-green.png"
          alt="Meditation illustration"
          style={{
            maxWidth: '450px',
            width: '100%',
            margin: '2rem auto',
            display: 'block',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#E6F4EA',
            padding: '10px',
          }}
        />

        <div className="hero-buttons">
          <a href="/profile" className="btn-primary">
            Create Your Profile
          </a>
          <a href="/mood-tracker" className="btn-secondary">
            Start Tracking
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Why Choose MindEase?</h2>
        <div className="card-grid">
          <div className="feature-card">
            <h3>AI-Powered Insights</h3>
            <p>Get personalized mental health recommendations and mood analysis powered by AI.</p>
          </div>
          <div className="feature-card">
            <h3>Track Your Progress</h3>
            <p>Monitor your mood patterns over time with easy-to-read graphs and analytics.</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Access</h3>
            <p>Your mental health tracker is available anytime, anywhere, on any device.</p>
          </div>
        </div>
      </section>

      {/* Call to Action - Ready to Begin Your Journey */}
      <section
        className="cta"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          textAlign: 'left',
          gap: '2rem',
        }}
      >
        <div style={{ flex: '1 1 300px' }}>
          <h2>Ready to Begin Your Journey?</h2>
          <p>Take control of your mental health today. Track your moods, view insights, and start feeling better.</p>
          <a href="/profile" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
            Get Started
          </a>
        </div>

        <div style={{ flex: '1 1 250px', textAlign: 'center' }}>
          <img
            src="/images/relax-illustration.png"
            alt="Relaxing meditation illustration"
            style={{ maxWidth: '250px', width: '100%', borderRadius: '12px' }}
          />
        </div>
      </section>
    </div>
  );
}
