export interface IArchiveCategory {
  id: number;
  title: string;
}

export interface IArchivesImages {
  id: number;
  title: string;
  image: string | null;
  file?: string;
}

export interface IArchiveData {
  id: number;
  title: string;
  archiveImages: IArchivesImages[];
  category: IArchiveCategory;
}
