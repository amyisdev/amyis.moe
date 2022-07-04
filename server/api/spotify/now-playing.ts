import { getNowPlaying } from '~~/lib/spotify';

export default defineEventHandler(async (event) => {
  event.res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');

  try {
    const res = await getNowPlaying();

    return {
      isPlaying: true,
      from: res.context.type,
      fromUrl: res.context.external_urls.spotify,
      name: res.item.name,
      url: res.item.external_urls.spotify,
      artists: res.item.artists.map(({ name, external_urls }) => ({
        name,
        external_urls: external_urls.spotify,
      })),
    };
  } catch (err) {
    return { isPlaying: false };
  }
});
