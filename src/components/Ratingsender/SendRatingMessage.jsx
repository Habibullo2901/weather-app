import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import './SendRatingMessage.css'

const SendRatingMessage = () => {
    const [rating, setRating] = useState(0);
    const chatId = "5721208379";  // Sizning chat ID
    const botToken = "7664614954:AAGXbdx1CpCNp0w_Xxrb8FBxXhmEm1C-OBE";  // Bot tokenini kiritish
    const [username, setUsername] = useState('');
    const [res, setRes] = useState('Bahoni yuborish');
    const [checkstatus, setCheckStatus] = useState(false);

    const sendMessageToTelegram = () => {
        const message = `Saytingizni ${username} ${rating} yulduzcha bilan baholadilar!`;

        //${e?.nativeEvent?.view?.clientInformation?.platform}

        if(username.length > 1) {
            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Xabar yuborildi:', data);
                    if(data.ok) {
                        setRes('Baho yuborildi!✅')
                        setCheckStatus(true)
                        setTimeout(() => {
                            setCheckStatus(false)
                            setRes('Bahoni yuborish!')
                        }, 3000);
                    }
                })
                .catch(error => {
                    console.error('Xatolik yuz berdi:', error);
                });
            }
            else{
                alert('Please enter your name!')
            }
            setRating(0);
            setUsername('');
    };

    return (
        <>
            <div className='rating-father'>
                <div className="rating-container">
                    <h2>Rate us 😉</h2>
                    <input className='input-sender' type="text" placeholder='your name' onChange={(e) => setUsername(e.target.value)} value={username} />
                    <div className="rating-stars">
                        <div className={rating >= 1 ? 'active__rate rating' : 'rating'} onClick={() => setRating(1)}><FaStar className='star' /></div>
                        <div className={rating >= 2 ? 'active__rate rating' : 'rating'} onClick={() => setRating(2)}><FaStar className='star' /></div>
                        <div className={rating >= 3 ? 'active__rate rating' : 'rating'} onClick={() => setRating(3)}><FaStar className='star' /></div>
                        <div className={rating >= 4 ? 'active__rate rating' : 'rating'} onClick={() => setRating(4)}><FaStar className='star' /></div>
                        <div className={rating >= 5 ? 'active__rate rating' : 'rating'} onClick={() => setRating(5)}><FaStar className='star' /></div>
                    </div>
                    <button className={checkstatus ? 'btn-sender activesender' : 'btn-sender'} onClick={sendMessageToTelegram}>{res}</button>
                </div>
            </div>
        </>
    );
};

export default SendRatingMessage;
