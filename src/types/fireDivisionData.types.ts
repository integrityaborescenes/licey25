export interface IFireDivisionImage {
  id: number;
  imageDivision: string;
}

export interface IFireDivisionData {
  id: number;
  title: string;
  description: string;
  images: IFireDivisionImage[];
}
