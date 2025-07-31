'use client';

export default function Resources() {
  return (
    <div className="page">
      {/* Banner */}
      <div
        style={{
          backgroundColor: '#E6F4EA',
          padding: '2rem',
          textAlign: 'center',
          borderRadius: '12px',
          marginBottom: '2rem',
        }}
      >
        <h1 style={{ color: '#4A7C59', fontSize: '2.5rem', marginBottom: '1rem' }}>
          Mental Health Resources
        </h1>
        <p style={{ color: '#4A5A4A', maxWidth: '600px', margin: '0 auto' }}>
          Discover articles, videos, and support to help you on your mental wellness journey.
        </p>
      </div>

      {/* Resource Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}
      >
        {/* Reading Articles */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
            textAlign: 'center',
          }}
        >
          <img
            src="/images/articles-guides.png"
            alt="Reading Articles"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              marginBottom: '1rem',
              borderRadius: '8px',
            }}
          />
          <h3 style={{ color: '#4A7C59' }}>Reading Articles</h3>
          <p style={{ color: '#4A5A4A' }}>
            Explore a variety of mental health articles to better understand and manage your
            well-being.
          </p>
          <a
            href="https://www.verywellmind.com/"
            className="btn-primary"
            style={{ marginTop: '1rem', display: 'inline-block' }}
          >
            Explore
          </a>
        </div>

        {/* Meditation & Videos */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
            textAlign: 'center',
          }}
        >
          <img
            src="/images/meditation-videos.png"
            alt="Meditation & Videos"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              marginBottom: '1rem',
              borderRadius: '8px',
            }}
          />
          <h3 style={{ color: '#4A7C59' }}>Meditation & Videos</h3>
          <p style={{ color: '#4A5A4A' }}>
            Watch guided meditation sessions and mental health videos to relax and recharge.
          </p>
          <a
            href="https://www.youtube.com/@Headspace"
            className="btn-primary"
            style={{ marginTop: '1rem', display: 'inline-block' }}
          >
            Watch Now
          </a>
        </div>

        {/* Therapy & Counseling */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
            textAlign: 'center',
          }}
        >
          <img
            src="/images/therapy-counseling.png"
            alt="Therapy & Counseling"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              marginBottom: '1rem',
              borderRadius: '8px',
            }}
          />
          <h3 style={{ color: '#4A7C59' }}>Therapy & Counseling</h3>
          <p style={{ color: '#4A5A4A' }}>
            Connect with licensed therapists for personalized support and guidance.
          </p>
          <a
            href="https://www.betterhelp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ marginTop: '1rem', display: 'inline-block' }}
          >
            Find Help
          </a>
        </div>
      </div>
    </div>
  );
}
