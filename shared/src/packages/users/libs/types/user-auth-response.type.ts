type UserAuthResponse = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  accountName: string | null;
  avatarUrl: string | null;
  isSubscribed: boolean | null;
};

export { type UserAuthResponse };
