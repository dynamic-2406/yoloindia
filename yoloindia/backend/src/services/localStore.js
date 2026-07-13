import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../..');
const runtimeDir = path.join(repoRoot, 'backend', 'data', 'runtime');

const ensureRuntimeDir = async () => {
  await mkdir(runtimeDir, { recursive: true });
};

const readCollection = async (fileName) => {
  await ensureRuntimeDir();
  const filePath = path.join(runtimeDir, fileName);

  try {
    const contents = await readFile(filePath, 'utf8');
    const parsed = JSON.parse(contents);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeCollection = async (fileName, items) => {
  await ensureRuntimeDir();
  const filePath = path.join(runtimeDir, fileName);
  await writeFile(filePath, `${JSON.stringify(items, null, 2)}\n`, 'utf8');
};

export const appendRecord = async (fileName, record) => {
  const collection = await readCollection(fileName);
  collection.push(record);
  await writeCollection(fileName, collection);
  return record;
};

export const updateRecordByKey = async (fileName, key, value, patch) => {
  const collection = await readCollection(fileName);
  const index = collection.findIndex((item) => item?.[key] === value);

  if (index === -1) {
    return null;
  }

  collection[index] = {
    ...collection[index],
    ...patch,
  };

  await writeCollection(fileName, collection);
  return collection[index];
};

export const findRecordByKey = async (fileName, key, value) => {
  const collection = await readCollection(fileName);
  return collection.find((item) => item?.[key] === value) || null;
};

