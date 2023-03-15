import {FileMimeTypesEnum} from '@enums/file-mime-types.enum';

export interface IFileModel {
  id?: string;
  fileName: string;
  originalName: string;
  url: string;
  mime: FileMimeTypesEnum;
  size: number;
  createdBy: string;
}
