import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fetch from 'node-fetch';
import SpotifyWebApi from 'spotify-web-api-node';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const client_id = process.env.SPOT_CLIENT_ID;
    const client_secret = process.env.SPOT_CLIENT_SECRET;
    const redirect_uri = 'http://localhost:3000/api/spotify/callback';

    // Get code_verifier using cookies() API
    const code_verifier = cookies().get('code_verifier')?.value;

    if (!code || !code_verifier) {
        console.error('Missing code or verifier:', { code, code_verifier });
        return NextResponse.json({ error: 'Missing authorization code or code verifier' }, { status: 400 });
    }

    try {
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri,
                code_verifier,
            }),
        });

        const data = await tokenResponse.json();

        if (!tokenResponse.ok) {
            console.error('Token response error:', data);
            throw new Error(data.error_description || 'Failed to get access token');
        }

        const { access_token, refresh_token } = data;



        // Create response with redirect
        const response = NextResponse.redirect('http://localhost:3000');

        // Set cookies with more specific options
        response.cookies.set('spotify_access_token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 3600 // 1 hour
        });

        response.cookies.set('spotify_refresh_token', refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 30 * 24 * 60 * 60 // 30 days
        });

        
        return response;

    } catch (error) {
        console.error('Error during authentication:', error);
        return NextResponse.json({
            error: 'Authentication failed',
            details: error.message
        }, { status: 500 });
    }
}