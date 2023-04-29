import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    login() {}

    signUp() {
        return 'Successfully signed up';
    }

    signIn() {
        return 'Signed in';
    }
}