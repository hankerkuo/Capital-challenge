class RandomUtil {
  // return null if array length = 0
  static getOneFromArray = <T>(array: T[]): T | null => {
    const length = array.length;
    if (length === 0) return null;
    const randomIdx = Math.floor(Math.random() * length);
    return array[randomIdx];
  }
  static getOneKeyValueFromObj = 
    (target: { [key: string]: string }): { key: string; value: string } | null=> {
    const randomKey = RandomUtil.getOneFromArray(Object.keys(target));
    return randomKey ? {
      key: randomKey,
      value: target[randomKey]
    }: null
  }
}

export default RandomUtil