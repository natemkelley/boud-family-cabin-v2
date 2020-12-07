import axios from 'axios';

export const getCabinImages = () => axios.get('https://boudfamilycabin.duckdns.org/files').then(({ data }) => data);
