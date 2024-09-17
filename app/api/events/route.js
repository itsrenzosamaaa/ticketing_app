// app/api/events/route.js
import axios from 'axios';
import { NextResponse } from 'next/server';

// Named export for the GET method
export async function GET() {
  const accessToken = process.env.EVENTBRITE_ACCESS_TOKEN;

  if (!accessToken) {
    console.error('Access token is missing');
    return NextResponse.json({ error: 'Access token is missing' }, { status: 401 });
  }

  try {
    const response = await axios.get('https://www.eventbriteapi.com/v3/events/1015054052997/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('Event data:', response.data);

    // Extract relevant fields to return
    const eventData = {
      id: response.data.id,
      name: response.data.name.text,
      description: response.data.description.text,
      url: response.data.url,
      startTime: response.data.start.local,
      endTime: response.data.end.local,
      capacity: response.data.capacity,
      status: response.data.status,
      currency: response.data.currency,
      summary:  response.data.summary,

      // Add more fields as needed
    };

    return NextResponse.json(eventData); // Return only the relevant fields
  } catch (error) {
    console.error('Error fetching event:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to fetch event', details: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
