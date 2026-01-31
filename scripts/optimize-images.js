import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const dirs = [
    'public/octobre rose',
    'public/valentine',
    'public/plein air'
];

async function processDir(dir) {
    const fullDir = path.join(rootDir, dir);
    try {
        const files = await fs.readdir(fullDir);
        for (const file of files) {
            if (file.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/) && !file.includes('_thumb')) {
                const inputPath = path.join(fullDir, file);
                const outputPath = path.join(fullDir, `${path.parse(file).name}_thumb.webp`);

                try {
                    await fs.access(outputPath);
                } catch {
                    console.log(`Processing ${file}...`);
                    await sharp(inputPath)
                        .rotate()
                        .resize({ height: 400, withoutEnlargement: true })
                        .webp({ quality: 75 })
                        .toFile(outputPath);
                }
            }
        }
    } catch (err) {
        console.error(`Error processing ${dir}:`, err.message);
    }
}

async function main() {
    console.log('Starting image optimization...');
    for (const dir of dirs) {
        await processDir(dir);
    }
    console.log('Image optimization complete!');
}

main();
