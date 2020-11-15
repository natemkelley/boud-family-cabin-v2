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
    lat: "",
    lon: "",
    title: "",
  },
  {
    src: "https://udottraffic.utah.gov/1_devices/aux16212.jpeg",
    label: "Dogwood MP 4.1",
    timeRefreshed: "",
    lat: "",
    lon: "",
    title: "",
  },
  {
    src: "https://udottraffic.utah.gov/1_devices/aux16213.jpeg",
    label: "S Curves MP 6.38",
    timeRefreshed: "",
    lat: "",
    lon: "",
    title: "",
  },
  {
    src: "https://udottraffic.utah.gov/1_devices/aux16215.jpeg",
    label: "Cardiff Fork MP 10.74",
    timeRefreshed: "",
    lat: "",
    lon: "",
    title: "",
  },
  {
    src: "https://udottraffic.utah.gov/1_devices/aux16216.jpeg",
    label: "Silver Fork MP 12.54",
    timeRefreshed: "",
    lat: "",
    lon: "",
    title: "",
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
