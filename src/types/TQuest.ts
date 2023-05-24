export type TQuestObj = {
  country: string;
  capital: string[];
  XYAxisOnMap?: number[];
}

export type TAnswerRecord = Array<TQuestObj & {timeSpent: number}>;