export interface TimeToShowSettings {
  id: number;
  type: string;
  timeStart: string;
  timeEnd: string;
  waitMode: string[];
  typeLabel: string;
}

export interface WaitModeType {
  id: number;
  file: string;
  vichFile: string;
  sequence: number;
  dateForShow: string;
  endDateForShow: string;
  timeForShow: string;
  timeToShowSettings?: TimeToShowSettings;
}

export type WaitModeSettingsType = {
  timeToWaitMode: number;
  imageShowTime: number;
};
