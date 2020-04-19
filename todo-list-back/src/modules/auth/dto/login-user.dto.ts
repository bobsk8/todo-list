import { User } from "src/modules/user/user.model";

export class LoginUserDto {

    constructor(
        public user?: User,
        public token?: string
    ) { }
}
