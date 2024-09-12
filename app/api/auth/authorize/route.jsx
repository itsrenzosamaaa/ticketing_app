import { NextResponse } from 'next/server';

export function GET() {
    const clientId = process.env.EVENTBRITE_API_KEY;
    const redirectUri = process.env.EVENTBRITE_REDIRECT_URI;

    const authorizationUrl = `https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    return NextResponse.redirect(authorizationUrl);
}