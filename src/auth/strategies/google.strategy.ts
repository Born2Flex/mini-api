import { PassportStrategy } from "@nestjs/passport";
import { Inject } from '@nestjs/common';
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { ConfigType } from "@nestjs/config";
import { AuthService } from "../auth.service";
import googleAuthConfig from "../../config/google-auth.config";

export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleAuthConfig.KEY) private readonly googleConfig: ConfigType<typeof googleAuthConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: googleConfig.clientID,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    console.log(profile);

    const user = {
      email: profile.emails[0].value,
      firstName: profile.firstName,
      lastName: profile.lastName,
      picture: profile.picture,
      accessToken: accessToken,
    }

    const dbUser = await this.authService.validateGoogleUser(user);
    done(null, dbUser);
  }
}
