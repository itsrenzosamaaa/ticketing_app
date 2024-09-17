import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  const EVENTBRITE_API_URL = 'https://www.eventbriteapi.com/v3/organizations/2315042951093/events/';
  const accessToken = process.env.EVENTBRITE_ACCESS_TOKEN;

  try {
    const response = await axios.get(EVENTBRITE_API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("response: ", response.data)

    11

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
