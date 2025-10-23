export type TUser = {
  name: string;
  email: string;
  password?: string;
  role: string;
  provider?: string;
  canAccess?: boolean;
  isBlocked?: boolean;
  googleAccessToken?: string;
  googleRefreshToken?: string;
};
