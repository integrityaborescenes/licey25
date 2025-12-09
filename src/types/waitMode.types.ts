export interface WaitModeType {
  id: number;
  file: string;
  sequence: number;
}

export type WaitModeSettingsType = {
  timeToWaitMode: number;
  imageShowTime: number;
};
