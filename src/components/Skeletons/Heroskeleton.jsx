import React from 'react';
import './Heroskeleton.css';

function HeroInfoSkeleton() {
  return (
    <>
      {/* Shahar nomi uchun skeleton */}
      <div className='hero__info__top'>
        <div className='hero__info__city skeleton'></div>
        <div className='hero__info__sun skeleton'></div>
      </div>

      {/* Harorat va rasm uchun bo'lim */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
        <div className='skeleton' style={{ width: '300px', height: '80px', borderRadius: '20px', margin: '20px 0' }}></div>
      </div>

      {/* Sana uchun skeleton */}
      <p className='hero__info__date skeleton'></p>

      {/* Tafsilotlar bo'limi uchun skeleton */}
      <div className='hero__info__details'>
        <p className='hero__info__details__item skeleton'></p>
        <p className='hero__info__details__item skeleton'></p>
        <p className='hero__info__details__item skeleton'></p>
        <p className='hero__info__details__item skeleton'></p>
      </div>
    </>
  );
}

export default HeroInfoSkeleton;
