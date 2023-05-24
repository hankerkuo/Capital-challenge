import RandomUtil from "src/utils/RandomUtil";

import type { TQuestObj } from "src/types/TQuest"

/**
 * Quest generator
 */

class QuestGenerator {

  static getOneFromQuests =
    (array: Array<TQuestObj>): TQuestObj | null => {
      const random = RandomUtil.getOneFromArray(array);
      if (random) {
        return {
          country: random.country,
          capital: random.capital,
          YXAxisOnMap: random.YXAxisOnMap,
        }
      } else {
        return null;
      }
    }
}

export default QuestGenerator;