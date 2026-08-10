
import { isImageKitUrl, withTransform } from "../../lib/imagekit";

const VIDEO_TRANSFORM = "q-80,w-640";
const POSTER_TRANSFORM = "q-80,w-640";



function buildPosterUrl(url) {
  if (!isImageKitUrl(url)) return undefined;
  const [path] = url.split("?");
  return withTransform(`${path}/ik-thumbnail.jpg`, POSTER_TRANSFORM);
}

/** ImageKit-optimized chat video with an auto-generated poster frame. */
export function MessageVideo({ src }) {
  const optimizedSrc = withTransform(src, VIDEO_TRANSFORM);
  const posterSrc = buildPosterUrl(src);

  return (
    <video
      src={optimizedSrc}
      poster={posterSrc}
      controls
      playsInline
      preload="metadata"
      className="mb-1.5 max-h-52 max-w-full rounded-lg object-contain sm:max-h-64 sm:rounded-xl"
    />
  );
}