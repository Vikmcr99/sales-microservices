import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../../config/constants/HttpStatus.js";
import UserExeption from "../../exception/UserException.js";
import * as secrets from "../../../config/constants/Secrets.js"

class UserService {

    async findByEmail(req) {
        try {
            const { email } = req.params;
            const {authUser} = req
            this.validateRequestData(email);
            let user =  await UserRepository.findByEmail(email);
            this.validadeUserNotFound(user);
            this.validateAuthenticatadeUser(user, authUser);

            return {
                status: httpStatus.SUCCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            }

        } catch (err) {
            return {
                status: err.status? err.status : httpStatus.BAD_REQUEST,
                message: err.message,
            }
        }

    }

    async getAccessToken(req){

        try{
            const {email, password} = req.body;
            this.validateAccessTokenData(email, password);
            let user = await UserRepository.findByEmail(email);
            this.validadeUserNotFound(user);
            await this.validatePassword(password, user.password);
            const authUser = {id: user.id, name: user.name, email: user.email};
            const accessToken = jwt.sign({authUser}, secrets.API_SECRET, {expiresIn: '1d'});

            return{
                status: httpStatus.SUCCESS,
                accessToken,
            }
        } catch (err){
            return {
                status: err.status? err.status : httpStatus.BAD_REQUEST,
                message: err.message,
            }

        }
    
    }

    validateAccessTokenData(email, password){
        if(!email || !password){
            throw new UserExeption(httpStatus.ANAUTHORIZED, 'Email and password must be informed.')
        }

    }

    validateRequestData(email) {
        if (!email)
            throw new UserExeption(httpStatus.BAD_REQUEST, 'User email was not informed.');

    }

    validadeUserNotFound(user){
        if(!user){
            throw new UserExeption(httpStatus.BAD_REQUEST, 'User was not found.')
        }
    }

    validateAuthenticatadeUser(user, authUser){
        if(!authUser || user.id !== authUser.id){
            throw new UserExeption(httpStatus.FORBIDDEN, 'You cannot see this user data.')
        }
    }

     async validatePassword(password, hashPassword){
        if(!await bcrypt.compare(password, hashPassword)){
            throw new UserExeption(httpStatus.ANAUTHORIZED, 'Wrong password')
        }

    }

}

export default new UserService();