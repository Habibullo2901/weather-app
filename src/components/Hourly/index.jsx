import React from 'react'
import './Hourly.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Hourly = () => {
    const [hourlyData, setHourlyData] = useState([])
    const region = useSelector((state) => state.statusParametr.region)
    const parametr = useSelector((state) => state.statusParametr.parametr)
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)

    // const [selectedCity, setSelectedCity] = useState('Tashkent')
    const [data, setData] = useState({})
    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${region}&days=7&aqi=yes&alerts=yes`)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }, [region])

    useEffect(() => {
        if (data && data.forecast && data.forecast.forecastday) {
            const currentHour = data.current.last_updated.split(" ")[1].split(":")[0];
            const firstDayHours = data.forecast.forecastday[0].hour; // Birinchi kun ma'lumotlari
            const secondDayHours = data.forecast.forecastday[1]?.hour || []; // Ikkinchi kun ma'lumotlari (agar mavjud bo'lsa)

            const updatedHourlyData = []; // 7 soatlik ma'lumotlarni saqlash uchun bo'sh massiv

            // Birinchi kundan kerakli ma'lumotlarni yig'ish
            for (let i = currentHour; i < 24; i++) {
                if (updatedHourlyData.length >= 7) break; // 7 ta soatlik ma'lumot to'plangan bo'lsa, to'xtatamiz
                const hourData = firstDayHours[i];
                updatedHourlyData.push({
                    time: hourData?.time.split(' ')[1], // Soat qismi
                    temp: parametr === 'celsius' ? hourData?.temp_c : hourData?.temp_f,
                    icon: hourData?.condition.icon,
                });
            }

            // Agar birinchi kundan ma'lumot yetmasa, ikkinchi kunning ma'lumotlarini qo'shish
            for (let i = 0; i < secondDayHours.length; i++) {
                if (updatedHourlyData.length >= 7) break; // Agar 7 ta soat to'ldirilgan bo'lsa, to'xtatamiz
                const hourData = secondDayHours[i];
                updatedHourlyData.push({
                    time: hourData?.time.split(' ')[1],
                    temp: parametr === 'celsius' ? hourData?.temp_c : hourData?.temp_f,
                    icon: hourData?.condition.icon,
                });
            }

            setHourlyData(updatedHourlyData); // Yangilangan ma'lumotlarni holatga saqlash
        }
    }, [data, region, parametr]);

    // console.log(hourlyData)

    return (
        <>
            <div className='hourly_temps'>
                {
                    isLoading ? (
                        <div className='skeletonna-loader'>
                            {Array.from({ length: 7 }).map((_, index) => (
                                <div className='hourly_temp skeletonna' key={index}>
                                    <div className='skeletonna__time'></div>
                                    <div className='skeletonna__img'></div>
                                    <div className='skeletonna__temp'></div>
                                    <div className='skeletonna__fon'></div>
                                </div>
                            ))}

                        </div>
                    ) : (
                        <div className='skeletonna-loader'>
                            {
                            hourlyData.map((item, index) => (
                                <div className='hourly_temp' key={index}>
                                    <p className='hourly_temp__time'>{item.time}</p>
                                    <img className='hourly_temp__img' src={item.icon} alt="" />
                                    <p className='hourly_temp__temp'>{item.temp}°{parametr === 'celsius' ? 'C' : 'F'}</p>
                                    <div className='hourly_temp__fon'></div>
                                </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>


        </>
    )
}

export default Hourly