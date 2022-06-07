import dayjs from "dayjs";

/**
 * 根据传入的日期返回当月时间
 * @param date
 * @returns {[]}
 */
export const getMonths = (date) => {
  const arr: any = [];
  const startDate = date.startOf('month');
  const daysInMonth = date.daysInMonth();
  for (let i = 0; i < daysInMonth; i++) {
    const d = dayjs(startDate).add(i, 'day');
    const obj = {
      key: i,
      dayjs: d.valueOf(),
      dd: d.format('D'),
      week: d.day(),
    };
    arr.push(obj);
  }
  return arr;
}
