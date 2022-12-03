import RandomUtil from "./RandomUtil";

test("Test getXFromArray", () => {
  
  // check normal situations
  const rawArray = [
    {'Taiwan': ['Taipei']},
    {'Japan': ['Tokyo']},
    {'Korea': ['Seoul']},
    {'China': ['Beijing']},
    {'Egypt': ['Cairo']}
  ]
  const result = RandomUtil.getXFromArray(rawArray, 3);
  expect(result).not.toBeNull();
  expect(result?.length).toBe(3);
  const dictToCheckDuplicate:{[key: string]: boolean} = {};
  // check every results are all different
  result?.forEach((singleResult) => {
    const key = Object.keys(singleResult)[0];
    expect(dictToCheckDuplicate[key]).toBe(undefined);
    dictToCheckDuplicate[key] = true;
  });

  // check case with empty array
  const emptyArray:Array<any> = [];
  const resultWithEmptyArray = RandomUtil.getXFromArray(emptyArray, 10);
  expect(resultWithEmptyArray).toBe(null);

  // check case with target number <= 0
  expect(() => RandomUtil.getXFromArray(rawArray, 0)).toThrow(Error);
  expect(() => RandomUtil.getXFromArray(rawArray, -1)).toThrow(Error);
});