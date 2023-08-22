const pool = require('./db').pool;

const getEvent = async (myId, groupIdList) => {
    
    for(let i=0;i<groupIdList.length;i++){
        groupIdList[i] = parseInt(groupIdList[i]);
        let Query = ` INSERT INTO event (group_id, user_id, created_at )  VALUES (${groupIdList[i]}, ${myId}, NOW())`;
        await pool.query(Query);

    }
    let Query = `   SELECT * , event.id AS id FROM event 
                    LEFT JOIN \`group\` ON event.group_id = group.id
                    WHERE user_id = ${myId}
                `;
    const [result] = await pool.query(Query);
    return result;

   
}
const readEvent = async (myId, eventId) => {
    let Query = `SELECT * FROM event WHERE user_id = ${myId} AND id = ${eventId} AND is_read = true`;
    const [read] = await pool.query(Query);
    Query = `SELECT * FROM event WHERE user_id = ${myId} AND id = ${eventId}`;
    const [exist] = await pool.query(Query);
    if(read.length > 0 || exist.length===0) return false;
    Query = `UPDATE event SET is_read = true WHERE user_id = ${myId} AND id = ${eventId}`;
    await pool.query(Query);
    return  parseInt(eventId);
}   

module.exports = {
    getEvent,
    readEvent
}