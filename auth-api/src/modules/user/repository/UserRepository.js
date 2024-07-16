import user from "../model/User.js";

class UserRepository {

async findById(id){
    try{
        return await user.findOne({where: {id} });

    }catch(err){
        console.log(err.message);
        return null;
    }
}

async findByEmail(email){
    try{
        return await user.findOne({where: {email} });

    }catch(err){
        console.log(err.message);
        return null;
    }
}
}

export default new UserRepository();