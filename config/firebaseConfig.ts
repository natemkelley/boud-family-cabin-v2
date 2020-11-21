export const cabinCardsCollection = "cabin-cards";

export interface CabinCard {
  title: string;
  info: string;
  createdAt: Date;
  active: boolean;
  uuid: string;
}
