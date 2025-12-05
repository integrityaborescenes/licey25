export interface ILyceyImages {
  id: number;
  imageLicey: string;
}

export interface ILyceyData {
  id: number;
  title: string;
  description: string;
  images: ILyceyImages[];
}
