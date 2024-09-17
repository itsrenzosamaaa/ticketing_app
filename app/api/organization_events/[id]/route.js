import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const response = await fetch(
      `https://www.eventbriteapi.com/v3/events/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${process.env.EVENTBRITE_ACCESS_TOKEN}`, // Ensure your API key is correct
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch event data" },
        { status: response.status }
      );
    }

    const eventData = await response.json();
    return NextResponse.json(eventData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching the event" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  // Assuming POST is correct method
  const { id } = params;
  const updatedEvent = await request.json();

  console.log("Updating event with data:", updatedEvent);

  try {
    const response = await fetch(
      `https://www.eventbriteapi.com/v3/events/${id}/`,
      {
        method: "POST", // Use POST if that's the method allowed
        headers: {
          Authorization: `Bearer ${process.env.EVENTBRITE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: {
            name: {
              html: updatedEvent.name, // Adjust fields based on API requirements
            },
            description: {
              html: updatedEvent.description,
            },
            start: {
              utc: updatedEvent.start, // Ensure correct date format and field name
            },
            end: {
              utc: updatedEvent.end, // Ensure correct date format and field name
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const responseBody = await response.text(); // Capture the response text
      return NextResponse.json(
        { error: `Failed to update event data: ${responseBody}` },
        { status: response.status }
      );
    }

    const updatedEventData = await response.json();
    return NextResponse.json(updatedEventData, { status: 200 });
  } catch (error) {
    console.error("Error while updating event:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the event" },
      { status: 500 }
    );
  }
}
