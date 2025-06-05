import './Navbar.css'
import weatherimg from '../../images/weather-img.png'
import { useDispatch } from 'react-redux'
import { changeParametr } from '../../redux/themeReducer'
import { useSelector } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsArrowUp } from "react-icons/bs";
import { ImLeaf } from "react-icons/im";

const Navbar = () => {
  const changerTheme = () => {
    dispatch(changeParametr(parametr === 'celsius' ? 'fahrenheit' : 'celsius'))
  }

  const parametr = useSelector((state) => state.statusParametr.parametr)
  const region = useSelector((state) => state.statusParametr.region)
  const dispatch = useDispatch();

  const [data, setData] = useState({})
  useEffect(() => {
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${region}&days=7&aqi=yes&alerts=yes`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [region])

  const air_quality = Math.round(data?.current?.air_quality?.pm2_5) || 0;
  const wind_deg = data?.current?.wind_degree || 0;
  // const wind_deg = 0;
  const currentUpdate = data?.current?.last_updated || "00:00:00";

  let statusColor;
  if (air_quality <= 50) {
    statusColor = '#00E400';
  } else if (air_quality <= 100) {
    statusColor = '#FFFF00';
  } else if (air_quality <= 150) {
    statusColor = '#FF7E00';
  } else if (air_quality <= 200) {
    statusColor = '#FF0000';
  } else if (air_quality <= 300) {
    statusColor = '#99004C';
  } else {
    statusColor = '#7E0023';
  }

  return (
    <>
      <div className='navbar'>
        <div className='head'>
          <h2> <img src={weatherimg} alt="cloud" className='head__icon' />   Weather App</h2>
          <p>last update in {data?.location?.name} time: {currentUpdate}</p>
        </div>
        <div className='head__info'>
          <div className='head__info__aqi'>
          <p className='aqi__fir'><ImLeaf style={{ marginBottom: '-5px' }} /> air quality: <span style={{ color: statusColor }}>{air_quality}</span></p>
          <p className='aqi__sec'><ImLeaf style={{ marginBottom: '-5px' }} /> aqi: <span style={{ color: statusColor }}>{air_quality}</span></p>
          </div>
          <div className='head__info__winddeg'>
            <p>wind degree:  </p>
            <div className='wind__degr'>
              <BsArrowUp className='wind__deg__icon' style={{ rotate: `${wind_deg}deg` }} />
              <div className='pole_n pole'>N</div>
              <div className='pole_w pole'>W</div>
              <div className='pole_s pole'>S</div>
              <div className='pole_e pole'>E</div>
            </div>
          </div>
        </div>

        <div className='head__switch'>
          <p>C</p>
          <div className='navbar__switch'>
            <input type="checkbox" id='switcher' onClick={() => changerTheme()} />
            <div className='navbar__switch__cont'>
              <label htmlFor="switcher" className='switch__circle'>
              </label>
            </div>
          </div>
          <p className='head__switch__f'>F</p>
        </div>
      </div>
    </>
  )
}

export default Navbar