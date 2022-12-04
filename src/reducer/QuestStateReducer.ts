import type { RefObject, 
  Reducer, Dispatch, SetStateAction } from 'react';

import QuestGenerator from 'src/module/QuestGenerator';
import type { TQuestObj, TAnswerRecord } from 'src/types/TQuest';

export type TQuestState = {
  // current quest
  quest: TQuestObj;
  // answer record for tracking user input answer and time spent
  answerRecord: TAnswerRecord;
  // track the game start and end
  gameOngoing: boolean;
  // for extracting next quest
  remainQuest: TQuestObj[];
}

export enum QuestActionEnum {
  START,
  ANSWER_MATCHED,
  QUEST_END,
  NEXT_QUEST,
  TYPE_TO_START,
}

export type TQuestAction = {
  type: QuestActionEnum;
  countries: TQuestObj[];
  inputEle: RefObject<HTMLInputElement>;
  timer: number;
  startTimer: () => void;
  resetTimer: () => void;
  setPause: Dispatch<SetStateAction<boolean>>;
}

const QuestStateReducer: Reducer<TQuestState, TQuestAction> = (state, action) => {
  switch (action.type) {
    case QuestActionEnum.START:
      action.inputEle.current!.disabled = false;
      action.inputEle.current!.placeholder = 'TYPE YOUR ANSWER';
      const randomStartQuest = 
        QuestGenerator.getOneKeyValueFromArray(action.countries);
      return { ...state, remainQuest: action.countries, answerRecord: [], quest: {
        country: randomStartQuest!.key,
        capital: randomStartQuest!.value
      } };
    case QuestActionEnum.ANSWER_MATCHED:
      // add answered record
      const newRecord = [...state.answerRecord];
      newRecord.push({
        country: state.quest.country,
        capital: state.quest.capital,
        timeSpent: action.timer
      });

      let newRemain = [ ...state.remainQuest ];
      // remove the answered one from the remain task
      newRemain = newRemain.filter(ele => ele.country !== state.quest.country);
      
      // remove text from the input
      action.inputEle.current!.value = '';
      action.resetTimer();
      return { ...state, answerRecord: newRecord, remainQuest: newRemain };
    case QuestActionEnum.QUEST_END:
      // disable button after all quests are done
      action.inputEle.current!.disabled = true;
      action.inputEle.current!.placeholder = 'FINISHED ALL QUESTS';
      action.setPause(true);
      return { ...state, gameOngoing: false };
    case QuestActionEnum.NEXT_QUEST:
      const randomQuestion = 
        QuestGenerator.getOneKeyValueFromArray(state.remainQuest);
      return {
        ...state, quest: {
          country: randomQuestion!.key,
          capital: randomQuestion!.value
        }
      };
    case QuestActionEnum.TYPE_TO_START:
      action.startTimer();
      return { ...state, gameOngoing: true };
    default:
      // default return is important for Reducer type checking,
      // or switch case has chance to return 'undefined'
      throw new Error();
  }
}

export default QuestStateReducer