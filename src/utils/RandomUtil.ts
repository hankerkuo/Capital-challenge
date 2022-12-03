class RandomUtil {

  // return null if array length = 0
  static getOneFromArray = <T>(array: T[]): T | null => {
    const length = array.length;
    if (length === 0) return null;
    const randomIdx = Math.floor(Math.random() * length);
    return array[randomIdx];
  }

  static getOneKeyValueFromObj = 
    <T>(target: { [key: string]: T }): { key: string; value: T } | null=> {
    const randomKey = RandomUtil.getOneFromArray(Object.keys(target));
    return randomKey ? {
      key: randomKey,
      value: target[randomKey]
    }: null
  }

  static getXFromArray = <T>(array: T[], targetX: number): T[] | null=> {
    const length = array.length;
    if (length === 0) return null;
    if (targetX <= 0) throw Error("target random amount should be > 0");
    // pick a start point
    const startIdx = Math.floor(Math.random() * length);
    // pick a interval which won't exceed array length
    let interval = Math.floor(Math.random() * Math.floor(length / targetX));
    interval = interval === 0 ? 1: interval;
    const result: T[] = [];
    for(let i = 0; i < targetX; i++) {
      let idx = startIdx + interval * i;
      idx = idx < length? idx: idx - length;
      result.push(array[idx]);
    }
    return result;
  }
}

export default RandomUtil