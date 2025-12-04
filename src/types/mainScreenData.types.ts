export interface MainScreenMuseumImage {
  id: number;
  file: string;
}

export interface MainScreenLiceyImage {
  id: number;
  file: string;
}

export interface IMainScreenData {
  slogan: string;
  description: string;
  mainScreenMuseumImages: MainScreenMuseumImage[];
  mainScreenLiceyImages: MainScreenLiceyImage[];
}
