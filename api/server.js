// BUILD YOUR SERVER HERE

const express = require('express')
const Model = require('./users/model')
const server = express();
server.use(express.json())



server.get('/api/users', async (req,res)=>{
    try{
        const users = await Model.find()
        res.status(200).json(users)
    }catch(err) {
        res.status(500).json({message: "Error happened when finding users"})
    }
  

})



server.get('/api/users/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        console.log(id)
        const user = await Model.findById(id)
        res.status(200).json(user)

    }catch(err) {
        res.status(500).json({
            message: `Error happened when finding user ${req.params.id}`})

            
    }
})


server.put('/api/users/:id', async (req,res)=>{
    try{
        
        const { id } = req.params;
       const updatedUser = await Model.update(id, req.body)
        console.log(req.body)
        res.status(200).json(
            {message: "user updated successfully",
                data: updatedUser 
            }
        )
    }catch(err){
        res.status(500).json({
            message: 'Error updating user',
            
        })
    }
})



server.delete('/api/users/:id', async(req,res)=>{

    try{
        const { id } = req.params;
        const deleted = await Model.remove(id)
        res.status(200).json({
            message: `User with id ${id} was successfully removed`,
            deleted: deleted
        })

    }catch(err){
        res.status(500).json({
            message: 'Error deleting user',
            
        })
    }
})


module.exports = server;