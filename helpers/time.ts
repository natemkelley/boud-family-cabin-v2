import { timeStamp } from 'console';
import moment from 'moment';

export const timeFromNowInMinutes = (timeFrom: Date) => {
  const now = moment();
  const fromNowDate = moment(timeFrom);
  const difference = now.diff(fromNowDate, 'minutes');
  return difference;
};
