const pool = require('./db');

async function check() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Connection successful:', res.rows[0]);

        const table = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log('Tables:', table.rows);
    } catch (err) {
        console.error('Connection failed:', err);
    } finally {
        pool.end();
    }
}

check();
