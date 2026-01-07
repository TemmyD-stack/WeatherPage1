import React, {useState, useEffect} from 'react'
import Header from "./components/Header"
import Hourly from "./components/Hourly";
import Overview from "./components/Overview";
import Search from "./components/Search"
const styles = {
  backgroundColor: 'hsl(243, 96%, 9%)',
  color: 'white',
};





function App() {
  
  const [location, setLocation] = useState({
    name: "Berlin",
    lat: 52.52,
    lon: 13.41,
  });


  const [weatherData, setWeatherData] = useState(null);

  // ✅ SEARCH → LAT/LON
  const searchLocation = async (query) => {
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=1`
      );

      const data = await res.json();
      if (!data.results) return;

      const place = data.results[0];

      setLocation({
        name: `${place.name}, ${place.country}`,
        lat: place.latitude,
        lon: place.longitude,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ FETCH WEATHER WHEN LAT/LON CHANGES
  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
    )
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((err) => console.error(err));
  }, [location.lat, location.lon]); 

  return (
    <section className="w-full px-4 lg:px-15 py-1 lg:py-4" style={styles}>
      <Header />

      
      <Search onSearch={searchLocation} />

      <section className="mt-8 py-2 flex flex-col lg:flex-row justify-between gap-8">
        <Overview
          current={weatherData?.current}
          hourly={weatherData?.hourly}
          location={location.name}
        />
        <Hourly hourly={weatherData?.hourly} />
      </section>
    </section>
  )
}

export default App
