export type UserRole = 'Admin' | 'Editor' | 'Viewer';

export interface UserProfile {
  uid: string;
  email: string | null;
  role: UserRole;
}
