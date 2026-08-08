import fs from 'fs';
import path from 'path';

const FILE = path.join(path.dirname(""), 'data/seen-jobs.json');

export async function loadSeen() {
  try {
    console.log("reading file ...");
    const data = await fs.readFileSync(FILE, 'utf-8');
    console.log("file read successfully");
    return new Set(JSON.parse(data));
  } catch (error) {
    console.log("error reading file,", error.message);
    return new Set();
  }
}

export async function saveSeen(seenSet) {
  try {
    console.log("creating directory...");
    await fs.mkdirSync(path.dirname(FILE), { recursive: true });
    console.log("directory created successfully");
    console.log("writing to file...");
    await fs.writeFileSync(FILE, JSON.stringify([...seenSet], null, 2), { encoding: 'utf-8' });
    console.log("file written successfully");
  } catch (error) {
    console.log("error writing to file, ", error.message);
  }
}