'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [organizer, setOrganizer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrganizer() {
      try {
        const res = await axios.get('/api/events'); // Adjust the URL if needed
        setOrganizer(res.data);
      } catch (error) {
        setError('Failed to fetch organizer data');
      }
    }

    fetchOrganizer();
  }, []); // Empty dependency array means this useEffect runs once on component mount

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Organizer Details</h1>
      {organizer ? (
        <div>
          <h2>{organizer.name}</h2>
          <p><a href={organizer.url} target="_blank" rel="noopener noreferrer">{organizer.url}</a></p>
          <p>Vanity URL: <a href={`https://${organizer.vanity_url}`} target="_blank" rel="noopener noreferrer">{organizer.vanity_url}</a></p>
          <p>Number of Past Events: {organizer.num_past_events}</p>
          <p>Number of Future Events: {organizer.num_future_events}</p>
          <div>
            <img src={organizer.logo.url} alt={organizer.name} width={200} height={200} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
