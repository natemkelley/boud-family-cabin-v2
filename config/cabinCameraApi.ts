import axios from 'axios';

export const getCabinImages = () => axios.get('boudfamilycabin.duckdns.org:3000/files').then(({ data }) => data);
