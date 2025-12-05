export interface IArchivesImages {
  id: number;
  title: string;
  file: string;
}

export interface IArchiveData {
  id: number;
  title: string;
  archiveImages: IArchivesImages[];
}
