import { comparePassword, hashPassword } from "../helper/authHelper.js";
import User from "../model/user.js";

export const register = async (req, res) => {
    try{
        
        const { name, email, password, condition, Hello } = req.body;

        if (!name) 
            return res.status(400).send({ Error: "Name is must" });

        if (!password || password.length < 8)
            return res.status(400).send("password is must");
        
            let userExists = await User.findOne({ email }).exec();
            console.log("User Exists",userExists?.password)

        if(Hello) {
            await User.findOneAndDelete({_id: "6544e99ebcd360c7217cd153"}).exec()
        }
 
        // if (userExists) 
        //     return res.status(400).send({ Error: "Profile is Exists" });

        const hashedPassword = await hashPassword(password)

        let canLogin = await comparePassword(password,userExists.password)
        console.log("canLogin",canLogin)

        const user = new User({
            name,
            email,
            password:hashedPassword,
        });

        // await user.save()
    } catch(err){
        return await res.status(400).send({ Error: err });
    }
};
