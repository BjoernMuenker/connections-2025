export const useServerTime = () => {
  async function getServerTime(): Promise<number | undefined> {
    const { data } = await useFetch<{ now: number }>('/api/time');
    return data.value?.now;
  }

  function isEqualOrLaterThan(start: Date | number, end: Date | number) {
    if (typeof start !== 'number') {
      start = start.getTime();
    }

    if (typeof end !== 'number') {
      end = end.getTime();
    }

    return start >= end;
  }

  return { getServerTime, isEqualOrLaterThan };
};
