export type UserRole = 'Admin' | 'Editor' | 'Viewer';

export interface UserProfile {
  uid: string;
  email: string | null;
  role: UserRole;
}

export interface AppNotification {
  id: string;
  message: string;
  read: boolean;
  timestamp: number;
  userId: string;
}

