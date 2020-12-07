import axios from 'axios';

export const getCabinImages = (number = 1) =>
  axios.get(`https://boudfamilycabin.duckdns.org/files?number=${number}`).then(({ data }) => data);
