import RandomUtil from "src/utils/RandomUtil";

import type { TQuestObj } from "src/types/TQuest"

/**
 * Quest generator
 */

class QuestGenerator {

  static getOneKeyValueFromArray =
    (array: Array<TQuestObj>): { key: string; value: string[] } | null => {
      const random = RandomUtil.getOneFromArray(array);
      if (random) {
        return {
          key: random.country,
          value: random.capital
        }
      } else {
        return null;
      }
    }
}

export default QuestGenerator;