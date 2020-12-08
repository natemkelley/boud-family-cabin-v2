export const infoCardsCollection = 'info-cards';
export const usersCollection = 'users';
export interface InfoCard {
  title: string;
  info: string;
  createdAt: Date | FirebaseFirestore.Timestamp;
  active: boolean;
  uuid: string;
  color: string;
}

export const firebaseTimestampToDate = (date: FirebaseFirestore.Timestamp) => {
  return date.toDate();
};
