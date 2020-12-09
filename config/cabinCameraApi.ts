import axios from 'axios';

export const apiURL = 'https://boudfamilycabin.duckdns.org';

export const getCabinImages = (number = 1) => axios.get(`${apiURL}/files?number=${number}`).then(({ data }) => data);

export const requestUpdatedImage = (camera: string) =>
  axios.get(`${apiURL}/update?camera=${camera}`).then(({ data }) => data);
