import { config } from 'dotenv';
 config();

export const jwtConstants = {
    
    secret: process.env.JWT_PRIVATE_KEY,

};