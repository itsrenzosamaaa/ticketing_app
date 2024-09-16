'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

const EventPage = () => {
  const [eventData, setEventData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch event data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch event data
        const eventResponse = await axios.get('/api/events');
        setEventData(eventResponse.data);

        // Fetch user data
        const userResponse = await axios.get('/api/users');
        setUserData(userResponse.data);

        setLoading(false);  // Stop loading once data is fetched
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render error state
  if (error) {
    return <p>{error}</p>;
  }

  // Render event data if available
  return (
    <div>
      {userData && (
        <div>
          <h2>User Info</h2>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          {userData.image && (
            <img src={userData.image} alt={`${userData.name}'s profile`} width="100" />
          )}
        </div>
      )}

      {eventData ? (
        <div>
          <h1>{eventData.name}</h1>
          <p>{eventData.description}</p>
          <p>
            <strong>Event Date:</strong> {new Date(eventData.startTime).toLocaleString()}
          </p>
          <p>
            <strong>End Date:</strong> {new Date(eventData.endTime).toLocaleString()}
          </p>
          <p>
            <strong>Capacity:</strong> {eventData.capacity}
          </p>
          <p>
            <strong>Status:</strong> {eventData.status}
          </p>
          <p>
            <strong>Currency:</strong> {eventData.currency}
          </p>
          <p>
            <strong>Summary:</strong> {eventData.summary}
          </p>
          <a href={eventData.url} target="_blank" rel="noopener noreferrer">
            View Event on Eventbrite
          </a>
        </div>
      ) : (
        <p>No event data available</p>
      )}
    </div>
  );
};

export default EventPage;
