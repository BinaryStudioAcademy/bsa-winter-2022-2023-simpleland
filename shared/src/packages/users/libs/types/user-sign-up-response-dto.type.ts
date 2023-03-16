type UserSignUpResponseDto = {
  token: string;
  user: { id: number; email: string };
};

export { type UserSignUpResponseDto };
