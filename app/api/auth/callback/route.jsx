import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET({ url }) {
    const urlParams = new URLSearchParams(url);
    const code = urlParams.get('code');
    const clientId = process.env.EVENTBRITE_API_KEY;
    const clientSecret = process.env.EVENTBRITE_CLIENT_SECRET;
    const redirectUri = process.env.EVENTBRITE_REDIRECT_URI;

    console.log(urlParams);
    console.log(code);
    console.log(clientId);
    console.log(clientSecret);
    console.log(redirectUri);

    try {
        const response = await axios.post('https://www.eventbrite.com/oauth/token', new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            redirect_uri: redirectUri,
        }).toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Store the access token in your session or database
        const { access_token } = response.data;

        return NextResponse.json({ access_token });
    } catch (error) {
        console.error('Error exchanging authorization code:', error.response?.data || error.message);
        return NextResponse.json({ error: 'Failed to exchange authorization code' }, { status: 500 });
    }
}