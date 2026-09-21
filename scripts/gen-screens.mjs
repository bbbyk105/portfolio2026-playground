/**
 * Half-width copies of the case-study screens.
 *
 * The originals are 1600px wide, which is right for a retina desktop and
 * roughly four times what a phone can use. Every screen gets an 800px
 * sibling next to it, and the markup offers both through srcset so the
 * browser takes whichever its own slot needs.
 *
 *   node scripts/gen-screens.mjs
 *
 * Run it after adding or replacing a screenshot in public/works. The output
 * is committed — there is no image step in the build, because the site is a
 * static export served straight from the edge.
 */
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const DIR = "public/works";
const WIDTH = 800;
const SUFFIX = `-${WIDTH}.webp`;

const files = (await readdir(DIR)).filter((f) => f.endsWith(".webp") && !f.endsWith(SUFFIX));

for (const file of files) {
  const source = join(DIR, file);
  const { width } = await sharp(source).metadata();
  if (!width || width <= WIDTH) {
    console.log(`skip  ${file} (already ${width}px)`);
    continue;
  }
  const out = join(DIR, file.replace(/\.webp$/, SUFFIX));
  const { size } = await sharp(source).resize({ width: WIDTH }).webp({ quality: 82 }).toFile(out);
  console.log(`write ${out}  ${Math.round(size / 1024)} KB`);
}
