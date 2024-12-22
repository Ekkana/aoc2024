import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const parseInput = (fileName) => {
    const inputRules = fs.readFileSync(path.join(__dirname, fileName), 'utf8').toString().trim();

    const [towelsStr, targetStr] = inputRules.split('\n\n');
    const towels = towelsStr.split(', ');
    const target = targetStr.split('\n');

    return [towels, target];
};
