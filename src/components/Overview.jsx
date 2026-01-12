import React from 'react'
const getDailyFromHourly = (hourly) => {
  if (!hourly?.time || !hourly?.temperature_2m) return [];

  const days = {};

  hourly.time.forEach((time, i) => {
    const date = time.split("T")[0];

    if (!days[date]) {
      days[date] = {
        temps: [],
      };
    }

    days[date].temps.push(hourly.temperature_2m[i]);
  });

  return Object.entries(days).slice(0, 7).map(([date, data]) => {
    const max = Math.max(...data.temps);
    const min = Math.min(...data.temps);

    return { date, max, min };
  });
};

const Overview = (props) => {
  // if (!current || !hourly) return null;

  const date = new Date(props.current?.time).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
const weekday = new Date(props.current?.time).toLocaleDateString("en-US", {
    weekday: "short",
  });
  const getTempIcon = (temp) => {
  if (temp <= 0) return "❄️";       
  if (temp <= 10) return "🥶";       
  if (temp <= 18) return "🌥️";  
  if (temp <= 25) return "☀️";     
  if (temp <= 32) return "🌤️";      
  return "🔥";                       
};

  const humidity = props.hourly?.relative_humidity_2m?.[0];
  const wind = props.current?.wind_speed_10m;
  const temperature = props.current?.temperature_2m;

  const dailyForecast = getDailyFromHourly(props.hourly);

   
            
  return (
    <div className=' w-full lg:w-2/3 mt-3'>
        <div className="
            bg-[url('/images/bg-today-small.svg')] 
            bg-cover bg-no-repeat bg-center w-full h-64 rounded-xl p-6 text-white
            flex flex-col justify-between items-center lg:flex-row
            lg:bg-[url('/images/bg-today-large.svg')] lg:h-96" 
        >
            <div className='text-center lg:text-left'>
                <h2 className='font-bold text-3xl'>{props.location}</h2>
                <p>{date}</p>
            </div>
            <div className='flex justify-between place-items-center'>
                <p className='text-6xl'>{getTempIcon(temperature)}</p>
                <p className='lg:text-9xl text-5xl font-bold px-6'> {Math.round(temperature)}°</p>
            </div>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-left text-white'>
            <div className='bg-gray-800 border border-blue-100 px-2 py-4 rounded-lg'>
              <h1>Feels like</h1>
              <p className='text-3xl py-2'>{Math.round(temperature) + 2}°</p>
            </div>
            <div className='bg-gray-800 border border-blue-100 px-2 py-4 rounded-lg'>
              <h1>Humidity</h1>
              <p className='text-3xl py-2'>{humidity}%</p>
            </div>
            <div className='bg-gray-800 border border-blue-100 px-2 py-4 rounded-lg'>
              <h1>Wind</h1>
              <p className='text-3xl py-2'>{wind} km/h</p>
            </div>
            <div className='bg-gray-800 border border-blue-100 px-2 py-4 rounded-lg'>
              <h1>Precipitation</h1>
              <p className='text-3xl py-2'>null</p>
            </div>
        </div>
        <div className='pt-10'>
          <h2 className='font-semibold text-xl pb-3'>Daily Forecast</h2>

          <div className='w-full grid grid-cols-3 lg:grid-cols-7 gap-4'>
          {dailyForecast.map((day) => {
  const weekday = new Date(day.date).toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <div
      key={day.date}
      className="w-28 lg:w-26 gap-2 rounded-lg py-2 bg-gray-800 text-white border border-cyan-100 text-center"
    >
      <p>{weekday}</p>

      <h2 className="p-6 text-3xl">
        {getTempIcon(day.max)}
      </h2>

      <div className="flex justify-between items-center px-2">
        <p>{Math.round(day.max)}°</p>
        <p>{Math.round(day.min)}°</p>
      </div>
    </div>
  );
})}


          </div>
        </div>

    </div>
  )
}

export default Overview