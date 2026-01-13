import React, { useState } from 'react'
import { IoSettingsOutline } from "react-icons/io5";

import logo from '../assets/images/logo.svg'
const styles = {
  backgroundColor: 'hsl(243, 96%, 9%)',
  color: 'white',
};
const options = [
  { value: 'temp', label: 'Temperature' },
  { value: 'humidity', label: 'Humidity' },
  { value: 'precipitation', label: 'Precipitation' },
  { value: 'wind', label: 'Wind' },
];
// const [units, setUnits] = useState('units');
const Header = () => {
  const [units, setUnits] = useState('units');
  return (
    <div className='flex justify-between items-center p-3'>
        {/* Logo Section */}
        <img src={logo} alt="Logo" />
        <select 
        className='border-b-blue-50 border-2 bg-transparent p-1' style={styles} 
        onChange={(e) => setUnits(e.target.value)}
        value={units}
        >
          {/* <IoSettingsOutline /> */}
          <option value="units">Units</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
    </div>
  )
}

export default Header