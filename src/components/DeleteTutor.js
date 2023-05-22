/* eslint-disable */
import { useEffect, useState, useRef } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, A11y } from "swiper";
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { useSelector, useDispatch } from 'react-redux';
// import { nanoid } from '@reduxjs/toolkit';
// import { selectAllTutors, getTutorsStatus, getTutorsError, fetchTutors, deleteTutor } from '../slices/tutorSlice';

import TutorListing from "./TutorListing";

// let x = 0
// let content;
const DeleteTutor = () => {  
  let delitem = true
  return (
    <div className='delTutor'>
      <TutorListing delitem ={ delitem } />
    </div>
  )
};

export default DeleteTutor;
