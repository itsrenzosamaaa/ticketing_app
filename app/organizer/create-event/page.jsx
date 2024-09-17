'use client';

import { useState } from 'react';
import { Box, Typography, Input, Button, FormLabel } from '@mui/joy';

export default function CreateEventPage() {
    const [name, setName] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Prepare the data for the API
            const res = await fetch('/api/createEvent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    start: new Date(start).toISOString(), // Convert to ISO format
                    end: new Date(end).toISOString(), // Convert to ISO format
                    description
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setSuccess('Event created successfully!');
                setError(null);
                console.log('Event created:', data);
            } else {
                const errorData = await res.json();
                setError(`Failed to create event: ${errorData.error_description || errorData.error}`);
                setSuccess(null);
            }
        } catch (err) {
            setError('An error occurred during the event creation');
            setSuccess(null);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', py: 3 }}>
            <Typography level="h1" sx={{ mb: 2 }}>Create Event</Typography>

            <form onSubmit={handleSubmit}>
                <FormLabel>Event Name</FormLabel>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <FormLabel>Start Date</FormLabel>
                <Input
                    type="datetime-local"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <FormLabel>End Date</FormLabel>
                <Input
                    type="datetime-local"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <FormLabel>Description</FormLabel>
                <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <Button type="submit" variant="solid" color="primary" fullWidth>
                    Create Event
                </Button>
            </form>

            {success && <Typography color="success" sx={{ mt: 2 }}>{success}</Typography>}
            {error && <Typography color="danger" sx={{ mt: 2 }}>{error}</Typography>}
        </Box>
    );
}
