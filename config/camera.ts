export interface CardData {
  id: number;
  src: string;
  timeRefreshed: Date;
  lat: string | number;
  lon: string | number;
  label: string;
  title: string;
  isVideo?: boolean;
}

const cameraData = [
  {
    src: "https://udottraffic.utah.gov/1_devices/aux14605.jpeg",
    label: "Wasatch Blvd",
    timeRefreshed: "",
    lat: 40.619458,
    lon: -111.789789,
    title: "",
    icon: "car",
  },
  {
    src: "https://udottraffic.utah.gov/1_devices/aux16212.jpeg",
    label: "Dogwood MP 4.1",
    timeRefreshed: "",
    lat: 40.623998,
    lon: -111.750147,
    title: "",
    icon: "car",
  },
  {
    src: "https://udottraffic.utah.gov/1_devices/aux16213.jpeg",
    label: "S Curves MP 6.38",
    timeRefreshed: "",
    lat: 40.649208,
    lon: -111.661005,
    title: "",
    icon: "car",
  },
  {
    src: "https://udottraffic.utah.gov/1_devices/aux16215.jpeg",
    label: "Cardiff Fork MP 10.74",
    timeRefreshed: "",
    lat: 40.649663,
    lon: -111.647041,
    title: "",
    icon: "car",
  },
  {
    src: "https://udottraffic.utah.gov/1_devices/aux16216.jpeg",
    label: "Silver Fork MP 12.54",
    timeRefreshed: "",
    lat: 40.638009,
    lon: -111.61962,
    title: "",
    icon: "car",
  },
  {
    src: "https://webcams.solitudemountain.com/LCMC.jpg",
    label: "Solitude - Mine Camp Lodge",
    timeRefreshed: "",
    lat: 40.619413,
    lon: -111.594717,
    title: "",
    icon: "solitude",
  },
  {
    src: "https://webcams.solitudemountain.com/rh1.jpg",
    label: "Solitude - Roundhouse",
    timeRefreshed: "",
    lat: 40.62367,
    lon: -111.598285,
    title: "",
    icon: "solitude",
  },
  {
    src:
      "https://s3.amazonaws.com/assets.quicktrax.com/solitude/webcams/roundhouse",
    label: "Solitude - Roundhouse 2",
    timeRefreshed: "",
    lat: 40.624022,
    lon: -111.597817,
    title: "",
    icon: "solitude",
  },
  {
    src:
      "https://s3.amazonaws.com/assets.quicktrax.com/solitude/webcams/powderhorn",
    label: "Solitude - Powder Horn",
    timeRefreshed: "",
    lat: 40.609446,
    lon: -111.604816,
    title: "",
    icon: "solitude",
  },
  {
    src:
      "https://s3.amazonaws.com/assets.quicktrax.com/solitude/webcams/moonbeam",
    label: "Solitude - Moon Beam",
    timeRefreshed: "",
    lat: 40.622935,
    lon: -111.598123,
    title: "",
    icon: "solitude",
  },
  {
    label: "Brighton - Parking Lot",
    src: "7-fShR1SuEU",
    timeRefreshed: "",
    lat: 40.599523,
    lon: -111.584219,
    title: "",
    isVideo: true,
    icon: "brighton",
  },
  {
    src: "YDyBL3bXOwA",
    label: "Brighton - Great Western",

    timeRefreshed: "",
    lat: 40.593085,
    lon: -111.562022,
    title: "",
    isVideo: true,
    icon: "brighton",
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
