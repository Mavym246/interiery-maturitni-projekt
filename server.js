import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import { handler } from './build/handler.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use('/api/realizace', express.static(path.join(__dirname, 'data', 'uploads')));

// SvelteKit handler pro všechny ostatní požadavky
app.use(handler);

app.listen(3000, () => {
  console.log('listening on port 3000');
});