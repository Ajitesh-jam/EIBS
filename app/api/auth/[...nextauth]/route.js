import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

// Your NextAuth configuration
const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: { scope: "user-read-email user-read-private" }, // Adjust scopes as needed
      },
    }),
  ],
};

export async function GET(req, res) {
  return NextAuth(req, res, authOptions);
}

export async function POST(req, res) {
  return NextAuth(req, res, authOptions);
}
