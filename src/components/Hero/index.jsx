import './Hero.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import HeroInfoSkeleton from '../Skeletons/Heroskeleton'
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import {changeRegion} from '../../redux/themeReducer'

const Hero = () => {

  const parametr = useSelector((state) => state.statusParametr.parametr)
  // console.log(parametr)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  const [selectedCity, setSelectedCity] = useState('Tashkent')
  const [data, setData] = useState({})

  useEffect(() => {
    dispatch(changeRegion(selectedCity))
  }, [selectedCity])

  useEffect(() => {
    setIsLoading(true)
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${selectedCity}&days=7&aqi=yes&alerts=yes`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, [selectedCity])

  const currentImg = data?.current?.condition?.icon || "";
  const location = data?.location?.name || "";
  const temp = (parametr === 'celsius' ? data?.current?.temp_c : data?.current?.temp_f) || 0;
  const humidity = data?.current?.humidity || 0;
  const uv = data?.current?.uv || 0;
  const sunset = data?.forecast?.forecastday[0]?.astro?.sunset || "0";
  const sunrise = data?.forecast?.forecastday[0]?.astro?.sunrise || "0";
  const pressure = data?.current?.pressure_mb || 0;
  const wind = +data?.current?.wind_kph || 0;
  const winddegree = +data?.current?.wind_degree || 0;
  const visibility = data?.current?.vis_km || 0;

  const firstday = data?.forecast?.forecastday[0]?.day?.condition?.icon || "";
  const secondday = data?.forecast?.forecastday[1]?.day?.condition?.icon || "";
  const thirddday = data?.forecast?.forecastday[2]?.day?.condition?.icon || "";


  const date = new Date();
  const dateday = date.getDate();
  const month = date.getMonth() + 1 === 1 ? "Jan" : date.getMonth() + 1 === 2 ? "Feb" : date.getMonth() + 1 === 3 ? "Mar" : date.getMonth() + 1 === 4 ? "Apr" : date.getMonth() + 1 === 5 ? "May" : date.getMonth() + 1 === 6 ? "Jun" : date.getMonth() + 1 === 7 ? "Jul" : date.getMonth() + 1 === 8 ? "Aug" : date.getMonth() + 1 === 9 ? "Sep" : date.getMonth() + 1 === 10 ? "Oct" : date.getMonth() + 1 === 11 ? "Nov" : "Dec";
  const weekday = date.getDay() === 0 ? "Sunday" : date.getDay() === 1 ? "Monday" : date.getDay() === 2 ? "Tuesday" : date.getDay() === 3 ? "Wednesday" : date.getDay() === 4 ? "Thursday" : date.getDay() === 5 ? "Friday" : "Saturday"

  const [region, setRegion] = useState("");

  const changerRegion = (e) => {
    e.preventDefault();
    setSelectedCity(region)
    setRegion('')
  }

  return (
    <>
      <div className='hero'>
        <form className='search' onSubmit={(e) => changerRegion(e)}>
          <input type="text" className='search__input' placeholder='Search location' onChange={() => setRegion(event.target.value)} value={region} />
        </form>
        <div className='hero__info'>
          {
            isLoading ? (
              <HeroInfoSkeleton />
            ) : (
              <>
                <div className='hero__info__top'>
                  <p className='hero__info__city'>{location}</p>
                  <div className='hero__info__sun'>
                    <div>
                      <FiSunrise />
                      <p>{sunrise}</p>
                    </div>
                    <div className='hero__info__sun__line'></div>
                    <div>
                      <FiSunset />
                      <p>{sunset}</p>
                    </div>
                  </div>
                </div>
                <div className='hero__info__img' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                  <h3 className='hero__info__temp'>{temp}°{parametr === 'celsius' ? 'C' : 'F'}</h3>
                  <img style={{ width: '100px', height: '100px' }} src={currentImg} alt="" />
                </div>
                <p className='hero__info__date'>{month} {dateday}, {weekday}</p>
                <div className='hero__info__details'>
                  <div>
                    <p>humidity</p>
                    <p>{humidity}%</p>
                  </div>
                  <div>
                    <p>visibility</p>
                    <p>{visibility}km</p>
                  </div>
                  <div>
                    <p>air pressure</p>
                    <p>{pressure}mb</p>
                  </div>
                  <div>
                    <p>wind</p>
                    <p>{wind}km/h</p>
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div >
    </>
  )
}

export default Hero