const errorMiddleware = require('../middleware/errorHandling');
const User = require('../models/User');
const {hash, comparePassword} = require('../helpers/auth');
const jwt = require('jsonwebtoken');


//  *====== User Register ======*
exports.register = async (req, res)=> {
    try{
        const { name, email, password } = req.body;

        if(!name.trim()){
           return res.json({error: 'Name is required'});
        }

        if(!email){
            return res.json({error: 'Email is required'});
        }

        if(!password || password.length < 6){
            return res.json({error: 'Password must be at least 6 character'});
        }

        // User Exists
        const userExists = await User.findOne({email});

        if(userExists){
            return res.json({error: 'This email already used'})
        }

       const hashPassword = await hash(password);

       const user = await new User({
            name,
            email,
            password: hashPassword
       }).save();

       const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

       res.json({
            user: {
                name: user.name,
                email: user.email      
            },
            token
       })

    }catch(error){
        errorMiddleware(error, req, res)
    }
}




//  *====== User Login ======*
exports.login = async (req, res)=> {
    try{
        const {email, password} = req.body;
        if(!email){
            return res.json({error: 'Email is missing'})
        }
        if(!password || password.length < 6 ){
            return res.json({error: 'Password must be at least 6 characters'})
        }

        const user = await User.findOne({email});
        
        if(!user){
            return res.status(404).json({error: 'User not found'});
        }

        const match = await comparePassword(password, user.password);
        if(!match){
            return res.json({error: 'Invalid Email or Password'});
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.json({
            user: {name: user.name, email: user.email, password: user.password},
            token
        })

    }
    catch{(error)=> {
        errorMiddleware(error, req, res)
    }}
}




//  *====== Update Profile ======*
exports.updateProfile = async (req, res)=> {
    try {
        const { name, password } = req.body;
        const user = await User.findById(req.user._id);

        if(password && password.length < 6){
            return res.json({
                error: 'Password id required and should be min 6 character long'
            })
        };

        const hashPassword = password ? await hash(password) : undefined;

        const update = await User.findByIdAndUpdate(
            req.user._id,
            {
                name    : name          || user.name,
                password: hashPassword  || user.password            
            },
            {new: true}
        )
        update.password = undefined;

        res.json(update)
        
    } catch (error) {
        errorMiddleware(error, req, res)
    }
}


