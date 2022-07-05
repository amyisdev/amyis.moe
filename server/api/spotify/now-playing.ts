import { getNowPlaying } from '~~/lib/spotify';
import type { NowPlayingResponse } from '~~/types/spotify';

export default defineEventHandler(async (event) => {
  event.res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');

  try {
    const res = await getNowPlaying();

    res.item.album.images.sort((a, b) => a.height - b.height);

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
      smallImage: res.item.album.images.at(0)?.url,
      bigImage: res.item.album.images.at(1)?.url,
    } as NowPlayingResponse;
  } catch (err) {
    // When not playing return empty data
    return { isPlaying: false, artists: [], from: '', fromUrl: '', name: '', url: '' } as NowPlayingResponse;
  }
});
