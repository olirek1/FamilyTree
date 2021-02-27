const axios = require('axios');

exports.homeRoutes = (req,res)=>{
    res.render('index');
}

exports.userRoutes = (req,res)=>{
    const id = req.params.id;
    axios.get('http://localhost:3000/api/users/'+id)
        .then(function(response){
            console.log(response);
            res.render('user', { users : response.data});
        })
        .catch(err=>{
            res.send(err);
        })
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users/'+req.params.id)
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}