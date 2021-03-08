export const mockState = {
  cityList: ["Minsk"],
  cityInfoList: [
    {
      coord: {
        lon: 27.5667,
        lat: 53.9,
      },
      weather: [
        {
          id: 600,
          main: "Snow",
          description: "light snow",
          icon: "13n",
        },
      ],
      base: "stations",
      main: {
        temp: -6.05,
        feels_like: -11.84,
        temp_min: -6.11,
        temp_max: -6,
        pressure: 1014,
        humidity: 79,
      },
      visibility: 10000,
      wind: {
        speed: 4,
        deg: 340,
      },
      snow: {
        "1h": 0.44,
      },
      clouds: {
        all: 75,
      },
      dt: 1615229579,
      sys: {
        type: 1,
        id: 8939,
        country: "BY",
        sunrise: 1615178497,
        sunset: 1615219181,
      },
      timezone: 10800,
      id: 625144,
      name: "Minsk",
      cod: 200,
    },
  ],
};
