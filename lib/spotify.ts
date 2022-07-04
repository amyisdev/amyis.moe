import { NowPlaying, TopTracks } from '~~/types/spotify';

const clientId = process.env.SPOTIFY_CLIENT_ID ?? '';
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? '';
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN ?? '';

const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
const REFRESH_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOP_TRACKS_URL = 'https://api.spotify.com/v1/me/top/tracks';

export const getAccessToken = () => {
  return $fetch<{ access_token: string }>(REFRESH_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });
};

export const getNowPlaying = async () => {
  const token = await getAccessToken();

  const response = await $fetch<NowPlaying>(NOW_PLAYING_URL, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });

  return response;
};

export const getTopTracks = async () => {
  const token = await getAccessToken();

  const response = await $fetch<TopTracks>(TOP_TRACKS_URL, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });

  return response;
};
