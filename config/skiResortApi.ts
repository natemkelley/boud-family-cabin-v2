import axios from "axios";

export interface SolitudeApi {
  CurrentConditions?: any;
  MountainAreas: any;
  ParkingLots: any;
  SnowReport: any;
  Forecast: any;
  LastUpdate: any;
}

export const getSolitudeInfo = () =>
  axios
    .get("https://mtnpowder.com/feed?resortId=65")
    .then(({ data }) => data as SolitudeApi);

export const getSolitudeWebcams = () =>
  axios.get("https://mtnpowder.com/feed/65/webcams").then(({ data }) => data);
