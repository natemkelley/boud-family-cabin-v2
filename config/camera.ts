export interface CardData {
  id: number;
  src: string;
  timeRefreshed: Date;
  lat: string;
  lon: string;
  label: string;
  title: string;
}

const cameraData = [
  {
    src: "https://udottraffic.utah.gov/1_devices/aux14605.jpeg",
    label: "Wasatch Blvd",
    timeRefreshed: "",
    lat: 40.619458,
    lon: -111.789789,
    title: "",
    //40.619458, -111.789789
  },
  {
    src: "https://udottraffic.utah.gov/1_devices/aux16212.jpeg",
    label: "Dogwood MP 4.1",
    timeRefreshed: "",
    lat: 40.623998,
    lon: -111.750147,
    title: "",
    //40.623998, -111.750147
  },
  {
    src: "https://udottraffic.utah.gov/1_devices/aux16213.jpeg",
    label: "S Curves MP 6.38",
    timeRefreshed: "",
    lat: 40.649208,
    lon: -111.661005,
    title: "",
    //40.649208, -111.661005
  },
  {
    src: "https://udottraffic.utah.gov/1_devices/aux16215.jpeg",
    label: "Cardiff Fork MP 10.74",
    timeRefreshed: "",
    lat: 40.649663,
    lon: -111.647041,
    title: "",
    //40.649663, -111.647041
  },
  {
    src: "https://udottraffic.utah.gov/1_devices/aux16216.jpeg",
    label: "Silver Fork MP 12.54",
    timeRefreshed: "",
    lat: 40.638009,
    lon: -111.61962,
    title: "",
    //40.638009, -111.619620
  },
];

export const getCameraData = () => {
  const data = cameraData.map((card, index) => {
    return {
      ...card,
      id: index + 1,
      timeRefreshed: new Date(),
    };
  });

  return data as CardData[];
};
