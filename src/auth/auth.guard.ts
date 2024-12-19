import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard as AuthGuardPassport } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends AuthGuardPassport('jwt') {
  private requiredRoles: string[];

  constructor(requiredRoles: string[] = []) {
    super();
    this.requiredRoles = requiredRoles;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // console.log('User in canActivate:', user); // Tambahkan logging di sini

    if (this.requiredRoles.length > 0 && (!user || !this.requiredRoles.some(role => user.role === role))) {
      console.log('Forbidden: User does not have required roles'); // Tambahkan logging di sini
      throw new ForbiddenException(
        `You do not have access to this resource. Required roles: ${this.requiredRoles.join(', ')}`
      );
    }

    return true;
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      // console.error('Error:', err);
      // console.error('User:', user);
      // console.error('Info:', info);
      throw err || new UnauthorizedException('Invalid token or user not authenticated');
    }

    const request = context.switchToHttp().getRequest();
    request.user = user; // Set user on request object

    // console.log('User in handleRequest:', user); // Tambahkan logging di sini

    return user;
  }
}