import { spawn } from 'node:child_process';
import net from 'node:net';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');
const backendEntry = resolve(repoRoot, 'backend', 'src', 'server.js');
const frontendViteEntry = resolve(repoRoot, 'frontend', 'node_modules', 'vite', 'bin', 'vite.js');
const nodeBinary = process.execPath;

const isPortOpen = (port) =>
  new Promise((resolvePort) => {
    const socket = net.connect({ host: '127.0.0.1', port });

    const done = (value) => {
      socket.removeAllListeners();
      socket.destroy();
      resolvePort(value);
    };

    socket.once('connect', () => done(true));
    socket.once('error', () => done(false));
    socket.setTimeout(1000, () => done(false));
  });

const start = (name, command, args, cwd) => {
  const child = spawn(command, args, {
    cwd,
    stdio: 'inherit',
    shell: false,
    env: process.env,
  });

  child.on('exit', (code, signal) => {
    if (signal || code !== 0) {
      console.log(`${name} exited with ${signal || code}`);
      process.exit(code ?? 0);
    }
  });

  return child;
};

const main = async () => {
  const backendUp = await isPortOpen(3001);
  const frontendUp = await isPortOpen(3002);

  if (backendUp) {
    console.log('Backend already running on port 3001, skipping start.');
  } else {
    start('backend', nodeBinary, [backendEntry], resolve(repoRoot, 'backend'));
  }

  if (frontendUp) {
    console.log('Frontend already running on port 3002, skipping start.');
  } else {
    start('frontend', nodeBinary, [frontendViteEntry], resolve(repoRoot, 'frontend'));
  }

  if (backendUp && frontendUp) {
    console.log('Both services are already running.');
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
