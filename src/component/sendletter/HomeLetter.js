import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import "./letter.css";
import SubscriptionModal from "./SubscriptionalModal";
import Thumbnail from "./Thumbnail";
import mirror from "../img/mirror.png";
import running from "../img/running.png";
import room from "../img/room.png";
import house from "../img/house.png";
import axios from "axios";

// const Button = styled.button`
//     width: 217px;
//     height: 68px;
//     padding: 10px;
//     background-color: #CA904B69;
//     border: none;
//     color: white;
//     border-radius: 6px;
//     cursor: pointer;
//     margin-top: 200px;
//     font-size: 18px;
//     font-weight: 400;
//     margin-left: 600px;

//     &:hover {
//         background-color: #CA904B72;
//     }
// `;

const localImages = [mirror, running, mirror, room];

function HomeLetter() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const [letters, setLetters] = useState([]);


  useEffect(() => {

    async function fetchLetters() {
      try {
        const response = await axios.get('http://3.36.240.5:3000/home_letters', {
          params: {
            page: 0, // Set the desired page
            size: 4 // Set the desired size
          }
        });
        console.log(response.data)

        if (response.data.isSuccess && response.data.code === 2000) {
          // Update state with fetched letters
          setLetters(response.data.result.Letter.slice(0,4));
          console.log("성공:", response.data);
        } else {
          console.error("Failed to fetch letters:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch letters:", error);
      }
    }

    fetchLetters();
  }, []);

  const isLoggedIn = localStorage.getItem('access_token') ? true : false;

  const openModal = () => {
    setModalIsOpen(true);
  };

  // const openModal = () => {
  //   if (isLoggedIn){
  //     setModalIsOpen(true);
  //   }
  //   else{
  //     navigate('/login');
  //   }
  // };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleThumbnailClick = (id, index) => {
    navigate(`/home-letter-story/${id}`, { state: { letters, currentIndex: index } });
  }

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  };
  
  return (
    <div className="HomeLetter">
      <header className="HomeLetter-header">
        <img src={house} alt='house'/>
        <h1>똑똑한 자취를 위한, 자취레터</h1>
        <p>다양한 자취와 관련된 정보를 찾아보세요.</p>
        <button onClick={openModal} className="subscribe-button">
          구독하기
        </button>
        <SubscriptionModal isOpen={modalIsOpen} onRequestClose={closeModal} />
      </header>
      <div className="thumbnails">
        {letters.map((letter,index) => (
          <Thumbnail
            key={letter.letter_id}
            id={letter.letter_id}
            src={localImages[index % localImages.length]}
            // src={letter.s3_key ? `http://3.36.240.5:3000/home_letters/${letter.s3_key}`:localImages[index % localImages.length]}
            description={letter.title}
            onClick={() => handleThumbnailClick(letter.letter_id, index)}
            publicationDate={formatDate(new Date(letter.created_at))}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeLetter;