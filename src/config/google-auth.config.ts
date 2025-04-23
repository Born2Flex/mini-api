import { ConfigService } from '@nestjs/config';

export interface GoogleOAuthConfig {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}

export const googleAuthConfig = (config: ConfigService): GoogleOAuthConfig => ({
  clientID: config.get<string>('GOOGLE_CLIENT_ID', ''),
  clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET', ''),
  callbackURL: config.get<string>('GOOGLE_CALLBACK_URL', ''),
});
