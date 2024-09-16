'use client';

import { useEffect, useState } from 'react';

const EventsList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched Data:', data);
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Events</h1>
      {categories.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <div style={{ padding: '1rem' }}>
              <li key={category.id}>
                <h2>{category.id}</h2>
                <strong>{category.name}</strong>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventsList;
