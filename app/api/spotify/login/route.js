import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.randomBytes(length);
    return Array.from(values).map(byte => possible[byte % possible.length]).join('');
};

const sha256 = (buffer) => crypto.createHash('sha256').update(buffer).digest();

const base64URLEncode = (buffer) => buffer.toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

// Comprehensive scopes for fan analysis
const scope = [
    'user-top-read',              // Access user's top artists and tracks
    'user-read-recently-played',  // Access user's recently played tracks
    'user-library-read',          // Access user's saved tracks and albums
    'playlist-read-private',      // Access user's private playlists
    'playlist-read-collaborative',// Access collaborative playlists
    'user-follow-read',          // Access user's followed artists
    'user-read-private',         // Access user's subscription details
    'user-read-email'            // Access user's email for identification
].join(' ');

export async function GET() {
    const client_id = process.env.SPOT_CLIENT_ID;
    const redirect_uri = 'http://localhost:3000/api/spotify/callback';
    const code_verifier = generateRandomString(64);
    const code_challenge = base64URLEncode(sha256(code_verifier));
    const state = generateRandomString(16);

    cookies().set('code_verifier', code_verifier, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 10 // 10 minutes
    });

    return NextResponse.json({
        url: `https://accounts.spotify.com/authorize?${new URLSearchParams({
            response_type: 'code',
            client_id,
            scope,
            redirect_uri,
            state,
            code_challenge_method: 'S256',
            code_challenge,
        }).toString()}`
    });
}