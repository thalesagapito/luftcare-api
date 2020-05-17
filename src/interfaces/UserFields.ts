import { UserRole } from '@/enums';

export default interface UserFields {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  name: string;
  email: string;
  phoneNumber: string;
  passwordHash: string;
  role: UserRole;
}
