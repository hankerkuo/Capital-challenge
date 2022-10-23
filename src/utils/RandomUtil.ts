class RandomUtil {
  static getOneFromArray = <T>(array: T[]): T => {
    const length = array.length;
    const randomIdx = Math.floor(Math.random() * length);
    return array[randomIdx];
  }
  static getOneKeyValueFromObj = 
    (target: { [key: string]: string }): { key: string; value: string } => {
    const randomKey = RandomUtil.getOneFromArray(Object.keys(target));
    return {
      key: randomKey,
      value: target[randomKey]
    }
  }
}

export default RandomUtil