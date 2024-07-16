import jwt from "jsonwebtoken";
import {promisify} from "util";

import AccessTokenExeption from "./AccessTokenException.js";

import * as secrets from "../constants/Secrets.js";
import * as httpStatus from "../constants/HttpStatus.js";


const emptySpace = " "

export default async (req, res, next) =>{

    try{

        const{authorization} = req.headers;
        if(!authorization) {
            throw new AccessTokenExeption(httpStatus.ANAUTHORIZED, ' Access Token was not informed.')
        }

        let accessToken = authorization;

        if(accessToken.includes(emptySpace)){
            accessToken = accessToken.split(emptySpace)[1];
        }

        const decoded =  await promisify(jwt.verify)(accessToken, secrets.API_SECRET);

        req.authUser = decoded.authUser;
        return next();

    } catch (err){
        const status = err.status? err.status : httpStatus.BAD_REQUEST;
        return res.status(status).json({status, message: err.message});

    };
}