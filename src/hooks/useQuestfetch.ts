import useSWR from 'swr'

import RandomUtil from 'src/utils/RandomUtil';
import type { TQuestObj } from 'src/types/TQuest';

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

const apiUrlPrefix = process.env.NODE_ENV === "test" ? process.env.TEST_URL : "";

const useQuestfetch = (amount: number) => {
  const {data, error, mutate} = useSWR<TQuestObj[]>(
    `${apiUrlPrefix}/api/capital-challenge/country-capital`, fetcher);
  let dataNeeded = undefined;
  if(data){
    dataNeeded = RandomUtil.getXFromArray<TQuestObj>(data, amount <= 0 ? 1 : amount);
  }
  return {
    quests: dataNeeded,
    isLoading: !error && !data,
    isError: error,
    refetch: mutate
  }
}

export default useQuestfetch;