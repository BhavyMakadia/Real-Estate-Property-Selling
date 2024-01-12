import User from '../modules/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

 const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
     
        //res.json(error.message);
        next(error);
     
    }
};
export { signup }; 

//export default signup;

export const signin = async ( req , res , next ) => {
    const {email,password}=req.body;
    try{
            const validuser = await User.findOne({email});
            if(!validuser) return next(errorHandler(404,'Invalid Data!'));
            const validPassword = bcryptjs.compareSync(password,validuser.password);
            if(!validPassword) return next(errorHandler(401,'Invalid Data!'));
            const token =jwt.sign({id : validuser._id},process.env.JWT_SECRET)
            res
            .cookie('access_token',token,{httpOnly:true })
            .status(200)
            .json(validuser);
    }catch(error){
        next(error);
    }
 }
