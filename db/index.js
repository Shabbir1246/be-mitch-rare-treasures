const { Pool } = require('pg');

// handle using the correct environment variables here

if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE not set');
}

module.exports = new Pool();
