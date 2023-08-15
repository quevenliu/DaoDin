const pool = require('./db').pool;

async function getUser(column, value) {
    try {
        const [[result]] = await pool.query(`SELECT * FROM user WHERE ${column} = ?`, [value]);
        return result;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function createUser(email, password, name) {
    try {
        const [result] = await pool.query(`INSERT INTO user (email, password, name) VALUES (?, ?, ?)`, [email, password, name]);
        return result.insertId;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function updateUser(id, name, self_intro) {
    try {
        await pool.query(`UPDATE user SET name = ?, self_intro = ? WHERE id = ?`, [name, self_intro, id]);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}


async function updateProfilePicture(user_id, imageUrl) {
    try {
        await pool.query(`UPDATE user SET picture = ? WHERE id = ?`, [imageUrl, user_id]);
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