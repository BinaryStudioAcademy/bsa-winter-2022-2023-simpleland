type UserSignInResponseDto = {
  token: string;
  user: { id: number; email: string };
};

export { type UserSignInResponseDto };
