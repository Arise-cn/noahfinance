import { readdir } from "fs/promises";
import path from "path";

const IMAGE_EXT = /\.(webp|png|jpe?g|svg|avif|gif)$/i;

/**
 * Lists image files in `public/images/partners` and returns public URL paths.
 * Sorted by filename (numeric-friendly).
 */
export async function getPartnerImageSrcs(): Promise<string[]> {
  const dir = path.join(process.cwd(), "public", "images", "partners");

  let names: string[];
  try {
    names = await readdir(dir);
  } catch {
    return [];
  }

  return names
    .filter((name) => !name.startsWith(".") && IMAGE_EXT.test(name))
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
    )
    .map((name) => `/images/partners/${encodeURIComponent(name)}`);
}
