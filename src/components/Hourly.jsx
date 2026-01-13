import React, {useState, useEffect} from 'react'

const getTempIcon = (temp) => {
  if (temp <= 0) return "❄️";       
  if (temp <= 10) return "🥶";       
  if (temp <= 18) return "🌥️";  
  if (temp <= 25) return "☀️";     
  if (temp <= 32) return "🌤️";      
  return "🔥";                       
};

const getUniqueDays = (hourly) => {
  if (!hourly?.time) return [];

  const days = hourly.time.map((t) => t.split("T")[0]);
  return [...new Set(days)];
};

const Hourly = (props) => {
  const [selectedDay, setSelectedDay] = useState("");
  
  useEffect(() => {
    if (props.hourly?.time) {
      setSelectedDay(props.hourly.time[0].split("T")[0]);
    }
  }, [props.hourly]);

  const getHourlyForDay = (hourly, day) => {
  if (!hourly?.time || !day) return [];

  return hourly.time
    .map((time, i) => {
      if (time.startsWith(day)) {
        return {
          time,
          temp: hourly.temperature_2m[i],
          wind: hourly.wind_speed_10m?.[i],
        };
      }
      return null;
    })
    .filter(Boolean)
     
};


  return (
    <div className='w-full lg:w-1/3 grid grid-cols-3 lg:grid-cols-7 mt-3 gap-2'>
      <div className='w-full col-span-full lg:col-span-7 p-5 bg-gray-800 rounded-md'>
        <div className='flex justify-between '>
          <h2 className='font-semibold text-xl pb-3'>Hourly Forecast</h2>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="bg-gray-800 border border-gray-100 text-white p-2 rounded-md h-12"
          >
            {getUniqueDays(props.hourly).map((day) => (
              <option key={day} value={day}>
                {new Date(day).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </option>
            ))}
          </select>
        </div>

        <div className='max-h-162.5 overflow-y-auto mt-3 pr-2'>
          {getHourlyForDay(props.hourly, selectedDay).map((hour, i) => (
            <div
              key={i}
              className="flex justify-between bg-gray-800 border border-gray-100 text-white rounded-lg gap-2 p-3 mt-4 mb-3 py-4 text-center"
            >
              <div className='flex gap-4'>
                <span className='text-3xl'>{getTempIcon(hour.temp)}</span>
                <p className="text-xl ">
                  {new Date(hour.time).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
                </p>
              </div>
              <p className="text-lg">{Math.floor(hour.temp)}°</p>
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}

export default Hourly