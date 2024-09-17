'use client';
import { Card, Typography, Button, Box } from '@mui/joy';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/organization_events`); // Fetch organizer events from the API
        const data = await res.json();
        if (res.ok) {
          setEvents(data.events);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to load events');
      }
    };
    fetchEvents();
  }, []);

  if (error) return <Typography color="danger">{error}</Typography>;

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography level="h1" sx={{ mb: 3 }}>Manage Your Events</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button component="a" href="/organizer/create-event">Add Event</Button>
              <Button component="a" color="danger" href="/">Logout</Button>
          </Box>
        </Box>
        {events.length === 0 ? (
          <Typography>No events found.</Typography>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
            {events.map((event) => (
              <Card key={event.id} variant="outlined" sx={{ maxWidth: 400, mx: 'auto', boxShadow: 'md' }}>
                <Typography level="h2" sx={{ fontSize: 'lg', mb: 1 }}>{event.name.text}</Typography>
                <Typography level="body2" sx={{ mb: 1 }}>{event.summary}</Typography>
                <Typography level="body2" sx={{ mb: 1 }}><strong>Date:</strong> {new Date(event.start.local).toLocaleString()}</Typography>
                <Button variant="solid" color="primary" sx={{ mt: 1 }} component="a" href={`/organizer/${event.id}/edit`}>Edit Event</Button>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}
