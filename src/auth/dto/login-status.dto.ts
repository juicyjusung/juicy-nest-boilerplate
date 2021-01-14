import { User } from '../../user/entity/user.entity';

export class LoginStatus {
  user: User;
  accessToken: any;
  expiresIn: any;
  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}
