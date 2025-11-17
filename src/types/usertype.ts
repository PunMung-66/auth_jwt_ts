interface UserType {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  googleId?: string;
  profilePhoto?: string;
  authProvider?: "local" | "google";
  token?: string;
}

export { UserType };
