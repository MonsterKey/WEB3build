const bs58 = require('bs58');
const fs = require('fs');
b = bs58.decode('');
j = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT);
fs.writeFileSync('id.json', `[${j}]`);
