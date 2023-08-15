const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.SQL_NODEJS_USER,
    password: process.env.SQL_NODEJS_PW,
    database: process.env.DB,
});

async function createGroup(myId, name, category, location, description) {
    if (name === undefined || category === undefined || location === undefined || description === undefined) {
        return false;
    }

    const Query = `INSERT INTO \`group\` (name, category, location, description, status) VALUES (?, ?, ?, ?, 'pending')`;
    const [result] = await pool.query(Query, [name, category, location, description]);
    return result.insertId;
}

async function getGroup(groupId) {
    const [data] = await pool.query('SELECT * FROM group WHERE id = ?', [groupId]);
    if(data.length ===0 ){return false;}
    returnData = {
        "group_id": groupId,
        "name": data[0]["name"],
        "catagory": data[0]["catogory"],
        "locatiov": data[0]["location"],
        "description": data[0]["description"],
        "status": data[0]["status"]

    }
    return returnData;
}

async function updateGroup(groupId, name, catagory, location, description, picture) {

    const Query = `
                    UPDATE \`group\` SET name = ?, catagory = ?, location = ?, description = ?, picture = ?  WHERE id = ?
                `
    const [result] = pool.query(Query, [name, catagory, location, description, picture, groupId]);
    return parseInt(groupId);

}

async function searchGroup(catagory, location, sort, joined, cursor, myId) {

   

}

