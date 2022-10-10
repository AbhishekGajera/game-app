const User = require('../models/user');
const bcrypt = require ('bcrypt'); // require bcrypt

//Post Method
module.exports.create_user =  async (req, res) => {

    const user = await User.findOne({ email : req.body.email })

    if(user) {
        return res.send({ message : 'email already exists' , success : false })   
    }

    const password = await bcrypt.compare(req.body.password, process.env.PASSWORD_HASH);
    const confirmPassword = await bcrypt.compare(req.body.confirm_password, process.env.PASSWORD_HASH);

    if(req.body.password !== req.body.confirm_password){
        return res.send({ message : 'password and confirm password does not match' , success : false })
    }

    req.body.password = password
    req.body.confirm_password = confirmPassword

    const data = new User(req.body)

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Get all Method
module.exports.getAllUsers =  async (req, res) => {
    try {
        const data = await User.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Get by ID Method
module.exports.getUserbyId =  async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Update by ID Method
module.exports.updateUser =  async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Delete by ID Method
module.exports.deleteUser =  async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}