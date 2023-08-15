const pool = require('./db').pool;

async function getUser(column, value) {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE ${column} = $1`, [value]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function createUser(email, password, name) {
    try {
        const [result] = await pool.query(`INSERT INTO users (email, password, name) VALUES ($1, $2, $3)`, [email, password, name]);
        return result.insertId;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function updateUser(id, name, self_intro) {
    try {
        await pool.query(`UPDATE users SET name = $1, self_intro = $2 WHERE id = $3`, [name, self_intro, id]);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}


async function updateProfilePicture(user_id, imageUrl) {
    try {
        await pool.query(`UPDATE users SET picture = $1 WHERE id = $2`, [imageUrl, user_id]);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    updateProfilePicture
}