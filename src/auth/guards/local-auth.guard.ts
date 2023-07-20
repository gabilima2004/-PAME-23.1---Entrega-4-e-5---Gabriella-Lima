import { AuthGuard } from "@nestjs/passport";
import { LoginDto } from "../dto/login.dto";
import { Injectable, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){
    handleRequest(err, user, info, context, status){
        const request = context.switchToHttp().getRequest();
        const { username, password}: LoginDto = request.body;
        if (err || !user ){
            if (!username){
                throw new HttpException (
                    { message: 'no email' },
                    HttpStatus.BAD_REQUEST,
                );
            } else if (!password){
                throw new HttpException(
                    { message: 'no password' },
                    HttpStatus.BAD_REQUEST,
                );
            } else {
                throw err || new UnauthorizedException();
            }
        }
        return user;
    }
}