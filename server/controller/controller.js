var Userdb = require('../model/model');

// create and save new user

exports.create = (req,res)=>{
    console.log("im in controller");
    //validate request
    if(!req.body){
        res.status(400).send({ message : "content can not be empty"});
        return;
    }
    //create user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        contact : req.body.contact,
        dob : req.body.dob,
        dod : req.body.dod,
        address : req.body.address,
        gender : req.body.gender,
    })

    // save user in database
    user
        .save(user)
        .then(data=>{
            // res.send(data);
            // console.log(data._id);
            res.redirect('/'+data._id);
        })
        .catch(err=>{
            res.status(500).send({
                message : err.message || "some error occured while saving your data"
            });
        });
}
// find all user
exports.find = (req,res)=>{
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send({ message : err.message || "Error occured while retrieving the data"});
    })
}

// find a single id 

exports.findOne = (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message : "data to update can not be empty"})
    }
    const id = req.params.id;

    console.log(id);

    Userdb.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message: "not found user with"+id})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message:"Err retrieving data with id "+id})
        })
}


// update 
exports.update = (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message : "data to update can not be empty"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
    })
}

// delete a user with specific id
exports.delete = (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}