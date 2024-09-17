// app/api/user/route.js
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
    const accessToken = process.env.EVENTBRITE_ACCESS_TOKEN;

    if (!accessToken) {
        console.error('Access token is missing');
        return NextResponse.json({ error: 'Access token is missing' }, { status: 401 });
    }

    try {
        const response = await axios.get('https://www.eventbriteapi.com/v3/users/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log('User data:', response.data);
        const userData = {
            name: response.data.name,
            email: response.data.emails[0].email,
            image: response.data.image_url,
        };

        return NextResponse.json(userData);
    } catch (error) {
        console.error('Error fetching user info:', error.response?.data || error.message);
        return NextResponse.json(
            { error: 'Failed to fetch user info', details: error.response?.data || error.message },
            { status: 500 }
        );
    }
}
