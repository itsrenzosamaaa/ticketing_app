'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For routing after form submission
import { Box, Typography, Input, Button } from '@mui/joy';
import { format } from 'date-fns-tz';

export default function EditEvent({ params }) {
    const [eventData, setEventData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const id = params.id;

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`/api/organization_events/${id}`);
                const data = await res.json();

                if (res.ok) {
                    setEventData(data);
                    setLoading(false);
                } else {
                    setError(data.error);
                    setLoading(false);
                }
            } catch (err) {
                setError('Failed to load event details');
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const localStartDate = e.target.startDate.value;
        const localEndDate = e.target.endDate.value;

        // Convert local date-time to UTC using toISOString
        const startDateUTC = new Date(localStartDate).toISOString();
        const endDateUTC = new Date(localEndDate).toISOString();

        // Validate strings
        const name = e.target.name.value.trim();
        const description = e.target.description.value.trim();

        if (!name || !description) {
            setError('Name and description cannot be empty.');
            return;
        }

        const updatedEvent = {
            name: { html: name },
            description: { html: description },
            start: { utc: startDateUTC },
            end: { utc: endDateUTC }
        };

        try {
            const res = await fetch(`/api/organization_events/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedEvent),
            });

            if (res.ok) {
                alert('Event updated successfully!');
                router.push('/manage-events');
            } else {
                const errorData = await res.json();
                setError(`Failed to update event: ${errorData.error}`);
            }
        } catch (err) {
            setError('An error occurred during the update');
        }
    };


    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="danger">{error}</Typography>;

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', py: 3 }}>
            <Typography level="h1" sx={{ mb: 2 }}>Edit Event</Typography>

            <form onSubmit={handleSubmit}>
                <Input
                    label="Event Name"
                    name="name"
                    defaultValue={eventData.name.html}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <Input
                    label="Event Description"
                    name="description"
                    defaultValue={eventData.description.html}
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <Input
                    label="Start Date"
                    name="startDate"
                    type="datetime-local"
                    defaultValue={eventData.start.local}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <Input
                    label="End Date"
                    name="endDate"
                    type="datetime-local"
                    defaultValue={eventData.end.local}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <Button type="submit" variant="solid" color="primary" fullWidth>
                    Update Event
                </Button>
            </form>
        </Box>
    );
}