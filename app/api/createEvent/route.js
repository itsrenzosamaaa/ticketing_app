import { NextResponse } from "next/server";
import { formatISO } from 'date-fns'; // For ISO date formatting

export async function POST(request) {
  try {
    const { name, start, end, description } = await request.json();
    const token = process.env.EVENTBRITE_ACCESS_TOKEN; // Eventbrite API token

    const eventData = {
      event: {
        name: { html: name }, // Event name in HTML
        description: { html: description }, // Event description in HTML
        start: {
          utc: formatISO(new Date(start)), // Convert start date to ISO string (UTC)
          timezone: "Asia/Manila" // Set to Philippines timezone
        },
        end: {
          utc: formatISO(new Date(end)), // Convert end date to ISO string (UTC)
          timezone: "Asia/Manila" // Set to Philippines timezone
        },
        currency: "PHP" // Set currency (Philippine Peso)
      }
    };

    const response = await fetch("https://www.eventbriteapi.com/v3/events/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}