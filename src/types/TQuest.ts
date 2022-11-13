export type TQuestObj = {
  country: string;
  capital: string[]
}

export type TAnswerRecord = Array<TQuestObj & {timeSpent: number}>;