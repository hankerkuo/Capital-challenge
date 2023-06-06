export type TQuestObj = {
  country: string;
  capital: string[];
  YXAxisOnMap?: number[];
}

export type TAnswerRecord = Array<TQuestObj & {timeSpent: number}>;