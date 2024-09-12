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

        const response = await axios.get(`https://www.eventbriteapi.com/v3/events/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            timeout: 10000, // adjust the timeout value as needed
        });

        console.log('Eventbrite API response:', response.data);

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching Eventbrite events:', error.response?.data || error.message);
        return NextResponse.json({ error: 'Failed to fetch events', details: error.response?.data || error.message }, { status: 500 });
    }
}