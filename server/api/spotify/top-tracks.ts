import { getTopTracks } from '~~/lib/spotify';

export default defineEventHandler(async (event) => {
  event.res.setHeader('Cache-Control', 'max-age=60, stale-while-revalidate=10');

  const res = await getTopTracks();

  return {
    items: res.items.map((item) => ({
      name: item.name,
      url: item.external_urls.spotify,
      artists: item.artists.map(({ name, external_urls }) => ({
        name,
        external_urls: external_urls.spotify,
      })),
    })),
  };
});
