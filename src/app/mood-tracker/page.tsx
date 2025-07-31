'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabaseUrl = 'https://iiqpufhlgejhvicwqmor.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcXB1ZmhsZ2VqaHZpY3dxbW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MjAzNjMsImV4cCI6MjA2OTE5NjM2M30.ZcuHpSZUK9-LAf51-WRPX5HGdRsYOx1rTYMeV0rWikg';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function MoodTracker() {
  const [mood, setMood] = useState('');
  const [feedback, setFeedback] = useState('');
  const [history, setHistory] = useState<{ mood: string; feedback: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from('mood_history')
        .select('mood, feedback')
        .order('created_at', { ascending: true });
      if (!error && data) setHistory(data);
    };
    fetchHistory();
  }, []);

  const handleMoodSelect = (m: string) => setMood(m);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (mood) {
    const { error } = await supabase.from('mood_history').insert([{ mood, feedback }]);
    if (!error) {
      setHistory([...history, { mood, feedback }]);

      // ✅ Send mood & feedback to AI agent via webhook
      const prompt = `The user is feeling ${mood}. Their journal says: "${feedback}". Suggest a short mental health recommendation.`;

      try {
        const response = await fetch('/api/send-to-n8n', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: prompt }),
        });

        const data = await response.json();
        console.log('AI Response:', data); // Optional: show it somewhere
      } catch (aiError) {
        console.error('Failed to contact AI agent:', aiError);
      }

      setMood('');
      setFeedback('');
      router.push('/dashboard');
    } else {
      console.error('Failed to log mood:', error.message);
      alert('Failed to log mood.');
    }
  }
};



  return (
    <div
      className="page"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '2rem',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ flex: '1 1 300px' }}>
        <h1>Mood Tracker</h1>
        <p>Pick your mood for today:</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', margin: '1rem 0' }}>
          {['😊', '😐', '😢', '😡', '😴'].map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleMoodSelect(emoji)}
              style={{
                fontSize: '2rem',
                background: mood === emoji ? '#06B6D4' : 'white',
                border: '2px solid #ddd',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                transition: 'background 0.3s, transform 0.2s',
              }}
            >
              {emoji}
            </button>
          ))}
        </div>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="How was your day? What challenges did you face?"
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '1rem',
            resize: 'none',
            minHeight: '80px',
          }}
        ></textarea>

        <form onSubmit={handleSubmit}>
          <button type="submit" className="btn-primary">
            Log Mood & Feedback
          </button>
        </form>
      </div>

      <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
        <img
          src="/images/mood-tracker-illustration.png"
          alt="Mood tracker illustration"
          style={{ maxWidth: '80%', borderRadius: '12px' }}
        />
      </div>
    </div>
  );
}
