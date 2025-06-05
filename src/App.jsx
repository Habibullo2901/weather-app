import { useEffect, useState } from 'react';
import './App.css'
import Hero from './components/Hero'
import Hourly from './components/Hourly'
import Navbar from './components/Navbar'
import SendRatingMessage from './components/Ratingsender/SendRatingMessage';

function App() {
  const [daytime, setDaytime] = useState('');
  useEffect(() => {
    // const currentTime = 6;
    const currentTime = new Date().getHours();
    if (currentTime >= 6 && currentTime < 18) {
      setDaytime('day');
    } else {
      setDaytime('night');
    }
  }, []);

  console.log(daytime)

  return (
    <>
      <div className={daytime === 'day' ? 'day clouds-container' : 'night clouds-container'} >
        <div className='cloud1'></div>
        <div className='cloud2'></div>
        <div className='cloud3'></div>
        {/* <div className='ice2'></div>
        <div className='ice3'></div> */}
      </div>

      {/* reja: 
      1.sayt ochilganda qotirilgan, biror lokatsiya qidirilganda shu lokatsiyaga qarab ozgaradigan dizayn yaratish.
      2.foydalanuvchi lokatsiyasini olish. agar ruxsat berilmasa mexanik tanlashni qilish (beckend kerak boladi) */}
      
        <Navbar />
        <Hero />
        <Hourly />
        <SendRatingMessage />
    </>
  )
}

export default App
