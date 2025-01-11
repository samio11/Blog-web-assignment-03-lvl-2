export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isActive: boolean;
};
