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

        // API URL to fetch the authenticated user's events
        const response = await axios.get('https://www.eventbriteapi.com/v3/categories', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            timeout: 10000,
        });

        console.log('Eventbrite API response:', response.data);

        // Map the response to extract event details
        const categories = response.data.categories.map((category) => ({
            id: category.id,
            name: category.name,
        }));

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching Eventbrite events:', error.response?.data || error.message);

        // Handle specific error status
        if (error.response?.status === 404) {
            return NextResponse.json(
                { error: 'User not found or invalid user ID', details: error.response?.data || error.message },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to fetch events', details: error.response?.data || error.message },
            { status: 500 }
        );
    }
}
