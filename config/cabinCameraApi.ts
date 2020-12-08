import axios from 'axios';

export const apiURL = 'https://boudfamilycabin.duckdns.org';

export const getCabinImages = (number = 1) => axios.get(`${apiURL}/files?number=${number}`).then(({ data }) => data);
