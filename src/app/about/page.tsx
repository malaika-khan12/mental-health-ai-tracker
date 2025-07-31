'use client';

export default function About() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        backgroundColor: '#E6F0E6', // pastel green
        padding: '3rem 2rem',
        borderRadius: '12px',
        marginTop: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Text Section */}
      <div style={{ flex: '1 1 400px', paddingRight: '2rem' }}>
        <h1 style={{ color: '#4A7C59', fontSize: '2.5rem', marginBottom: '1rem' }}>
          About MindEase
        </h1>
        <p style={{ color: '#374151', fontSize: '1.1rem', lineHeight: '1.8' }}>
          MindEase is your AI-powered mental wellness companion. 
          Our mission is to help you track your mood, understand your emotional patterns,
          and support your journey towards a healthier mind. 
          With 24/7 access, mood tracking, and personalized recommendations, 
          MindEase brings peace and clarity into your everyday life.
        </p>
      </div>

      {/* Image Section */}
      <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
        <img
          src="/images/about-illustration.png"
          alt="MindEase About Illustration"
          style={{
            maxWidth: '100%',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>
    </div>
  );
}
