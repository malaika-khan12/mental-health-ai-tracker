'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { createClient } from '@supabase/supabase-js';
import { sendMessageToN8N } from '@/app/actions/sendMessage';

const supabaseUrl = 'https://iiqpufhlgejhvicwqmor.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcXB1ZmhsZ2VqaHZpY3dxbW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MjAzNjMsImV4cCI6MjA2OTE5NjM2M30.ZcuHpSZUK9-LAf51-WRPX5HGdRsYOx1rTYMeV0rWikg';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Dashboard() {
  const [data, setData] = useState<{ day: string; mood: string; feedback: string }[]>([]);
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAndRecommend = async () => {
      const { data, error } = await supabase
        .from('mood_history')
        .select('mood, feedback, created_at')
        .order('created_at', { ascending: true });

      if (!error && data) {
        const lastSeven = data.slice(-7).map((entry, i) => ({
          day: `Day ${i + 1}`,
          mood: entry.mood,
          feedback: entry.feedback || 'No feedback provided',
        }));
        setData(lastSeven);

        const latestEntry = data[data.length - 1];
        if (latestEntry) {
          try {
            const prompt = `The user is feeling ${latestEntry.mood}. Their journal says: "${latestEntry.feedback}". Suggest a short mental health recommendation.`;
            const result = await sendMessageToN8N(prompt);
            setRecommendation(result?.output || 'No suggestion received');
          } catch (err) {
            console.error('AI fetch error:', err);
            setRecommendation('Failed to fetch AI recommendation.');
          }
        }
      }

      setLoading(false);
    };

    fetchDataAndRecommend();
  }, []);

  const moodScale: Record<string, number> = {
    '😢': 1,
    '😐': 2,
    '😊': 3,
    '😄': 4,
    '🤩': 5,
    '😡': 1.5,
    '😴': 2.5,
  };

  const numberToEmoji: Record<number, string> = {
    1: '😢',
    2: '😐',
    3: '😊',
    4: '😄',
    5: '🤩',
  };

  const chartData = data.map((entry, index) => ({
    day: entry.day,
    mood: moodScale[entry.mood] || 3,
    emoji: entry.mood,
    id: index,
  }));

  const averageMood =
    chartData.reduce((sum, entry) => sum + entry.mood, 0) / (chartData.length || 1);

  const moodCounts = data.reduce((count: Record<string, number>, entry) => {
    count[entry.mood] = (count[entry.mood] || 0) + 1;
    return count;
  }, {});

  const mostCommonMood =
    Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '😊';

  const renderEmojiDot = (props: any) => {
    const { cx, cy, payload, index } = props;
    return (
      <g key={`dot-${index}`} transform={`translate(${cx || 0}, ${cy || 0})`}>
        {payload?.emoji && (
          <text x={0} y={0} dy={5} textAnchor="middle" fontSize={16} pointerEvents="none">
            {payload.emoji}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="page">
      <h1 style={{ color: '#4A7C59' }}>Dashboard</h1>
      <p>Visualize your mood history with AI-generated insights.</p>

      <div className="dashboard-card">
        <h3 style={{ color: '#4A7C59' }}>AI Recommendations</h3>
        {loading ? <p>Generating recommendation...</p> : <p>{recommendation}</p>}
      </div>

      <div className="dashboard-card" style={{ padding: '1rem' }}>
        <h3 style={{ color: '#4A7C59' }}>Mood Trends</h3>
        {chartData.length > 0 ? (
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis
                  domain={[1, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tickFormatter={(value) =>
                    numberToEmoji[value as keyof typeof numberToEmoji] || '🙂'
                  }
                />
                <Tooltip
                  formatter={(value: any) =>
                    numberToEmoji[value as keyof typeof numberToEmoji] || '🙂'
                  }
                  labelFormatter={(label) => `Day: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#4A7C59"
                  strokeWidth={3}
                  dot={renderEmojiDot}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p>No mood data logged yet. Log some moods to see trends!</p>
        )}
      </div>

      <div className="dashboard-card">
        <h3 style={{ color: '#4A7C59' }}>Weekly Summary</h3>
        <p>
          Average Mood:{' '}
          {numberToEmoji[Math.round(averageMood) as keyof typeof numberToEmoji] || '🙂'}
        </p>
        <p>Most Common Mood: {mostCommonMood}</p>
      </div>

      <div className="dashboard-card">
        <h3 style={{ color: '#4A7C59' }}>Feedback</h3>
        {data.map((entry, index) => (
          <div
            key={`${entry.day}-${index}`}
            style={{
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid #ddd',
            }}
          >
            <strong>{entry.day}:</strong> {entry.feedback}
          </div>
        ))}
      </div>
    </div>
  );
}
