const model = require('../Model/group_model');
const createGroup = async(req,res)=>{

    let imageUrl = null;
    if(!req.file){
        
        imageUrl = req.file;
        const imageUrl = `https://${process.env.PUBLIC_IP}/static/` + req.fileName;
    }

    const id = await model.createGroup( req.body.name, req.body.category, req.body.location ,req.body.description, imageUrl);
    if(id ===false){
		res.status(400).send(JSON.stringify({"error":"can't create"}));
		return;
    }
	res.status(200).send(JSON.stringify({group_id:id}));
}
const getGroup = async(req,res)=>{
    const groupId = req.params.group_id;
    const data = await model.getGroup(groupId);
    if(data ===false){
		res.status(400).send(JSON.stringify({"error":"can't get"}));
		return;
    }
	res.status(200).send(JSON.stringify({group_id:id}));
}

const updateGroup = async(req,res)=>{
    const groupId = req.params.group_id;
    
    const id = await model.updateGroup(req.authorization_id, groupId, req.body.name, req.body.category, req.body.location ,req.body.description, req.body.picture );
    if(id ===false){
		res.status(400).send(JSON.stringify({"error":"can't update"}));
		return;
    }
	res.status(200).send(JSON.stringify({group_id:id}));
}



const searchGroup = async(req, res)=>{
    const catagory = req.query.catagory
    const location  = req.query.location;
    const sort =req.query.sort;
    const  joined = req.query.joined;
	const cursor = req.query.cursor;
    const myId =req.authorization_id;
     
    const groups = model.searchGroup(catagory, location, sort, joined, cursor, myId);






}


module.exports = {create};