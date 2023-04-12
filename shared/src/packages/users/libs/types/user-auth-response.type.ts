type UserAuthResponse = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  accountName: string | null;
  avatarUrl: string | null;
  subscriptionEndDate: string | null;
};

export { type UserAuthResponse };
