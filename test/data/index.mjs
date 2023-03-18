import { hkid } from './hkid.mjs';
import { twid } from './twid.mjs';
import { twrc } from './twrc.mjs';
import { cnid } from './cnid.mjs';
import { krid } from './krid.mjs';

export { hkid, twid, twrc, cnid, krid };
export const allData = [].concat(hkid, twid, twrc, cnid, krid);
