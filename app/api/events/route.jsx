import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    const accessToken = process.env.EVENTBRITE_ACCESS_TOKEN;

    if (!accessToken) {
        console.error('Access token is missing');
        return NextResponse.json({ error: 'Access token is missing' }, { status: 401 });
    }

    try {
        console.log('Sending request to Eventbrite API with token:', accessToken);

        // Corrected API URL to fetch events for the user
        const response = await axios.get('https://www.eventbriteapi.com/v3/users/2315042679203/events/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            timeout: 10000, // adjust the timeout value as needed
        });

        console.log('Eventbrite API response:', response.data);

        // Map the response to extract events (if necessary)
        const events = response.data.events.map((event) => ({
            id: event.id,
            name: event.name.text, // Assuming 'name.text' contains the event name
        }));

        return NextResponse.json(events);
    } catch (error) {
        console.error('Error fetching Eventbrite events:', error.response?.data || error.message);

        return NextResponse.json(
            { error: 'Failed to fetch events', details: error.response?.data || error.message },
            { status: 500 }
        );
    }
}
