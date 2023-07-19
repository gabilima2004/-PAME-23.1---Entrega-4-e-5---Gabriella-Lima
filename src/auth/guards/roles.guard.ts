import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private reflector: Reflector)

    canActivate(context: ExecutionContext): boolean{
        const { user } = context.switchToHttp().getRequest();
        if (!user) return false;

        return user.admin;
    }
}