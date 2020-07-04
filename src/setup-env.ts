import { addAlias } from 'module-alias';
import { resolve } from 'path';
import { config } from 'dotenv';

addAlias('@', __dirname);
config({ path: resolve(__dirname, '../.env') });
