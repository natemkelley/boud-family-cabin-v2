export interface CardData {
  id: number;
  src: string;
  timeRefreshed: Date;
  lat: string | number;
  lon: string | number;
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
  },
  {
    src: "https://udottraffic.utah.gov/1_devices/aux16212.jpeg",
    label: "Dogwood MP 4.1",
    timeRefreshed: "",
    lat: 40.623998,
    lon: -111.750147,
    title: "",
  },
  {
    src: "https://udottraffic.utah.gov/1_devices/aux16213.jpeg",
    label: "S Curves MP 6.38",
    timeRefreshed: "",
    lat: 40.649208,
    lon: -111.661005,
    title: "",
  },
  {
    src: "https://udottraffic.utah.gov/1_devices/aux16215.jpeg",
    label: "Cardiff Fork MP 10.74",
    timeRefreshed: "",
    lat: 40.649663,
    lon: -111.647041,
    title: "",
  },
  {
    src: "https://udottraffic.utah.gov/1_devices/aux16216.jpeg",
    label: "Silver Fork MP 12.54",
    timeRefreshed: "",
    lat: 40.638009,
    lon: -111.61962,
    title: "",
  },
  {
    src: "https://webcams.solitudemountain.com/LCMC.jpg",
    label: "Solitude Resort Lodge",
    timeRefreshed: "",
    lat: 40.624282,
    lon: -111.597931,
    title: "",
  },
  {
    src:
      "https://www.skiutah.com/members/brighton/webcams/brighton-parking-lot",
    label: "Brighton Ski Lot",
    timeRefreshed: "",
    lat: 40.599523,
    lon: -111.584219,
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
