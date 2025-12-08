export interface IPersonImage {
  id: number;
  file: string;
}

export interface IPersonData {
  id: number;
  name: string;
  bio: string;
  grade: string;
  historyPersonImages: IPersonImage[];
}
