export enum BackgroundCardStatus {
  Applied,
  Owned,
  CanBePurchased,
  EventOnly,
}

export type Background = {
  id: string;
  name: string;
  status: BackgroundCardStatus;
  price?: number;
  backgroundImageName: string;
};

export type Player = {
  id: string;
  name: string;
  balance: number;
  level: number;
  score: number;
  frameUrl: string;
  avatarUrl: string;
  background: string;
};
