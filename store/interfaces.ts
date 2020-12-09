export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  lastSeen: Date | {};
  admin?: boolean;
  authorized: boolean;
}
