/* eslint-disable */
import { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ReserveItemComponent from './ReserveItemComponent';
import {
  selectAllReserves, getReservesStatus, getReservesError, fetchAllReserve,
} from '../slices/reservationSlice';
import useAuth from '../hooks/useAuth';


const MyReservations = () => {
  let content;
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const reserves = useSelector(selectAllReserves);
  const reservesStatus = useSelector(getReservesStatus);
  const reservesError = useSelector(getReservesError);
  const delitem = true

  useEffect(() => {
    if (reservesStatus === 'idle') {     
      dispatch(fetchAllReserve());
    }
    console.log(auth, " ---autheffect---", reservesStatus);
  }, [reservesStatus, dispatch]);

  if (reservesStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (reservesStatus === 'succeeded') {
    if (reserves.length === 0) {
      content = <h1>Please, add a tutor</h1>;
    } else {
      
      content = reserves.map((item) => (
        <SwiperSlide key={nanoid()}>
          <div className='linkwrapper'>
              {delitem ? (
                      // <a className="card"> 
                        <ReserveItemComponent item = {item} delitem={ delitem } />
                      // </a>
              ) : (
                      
                      // <Link className="card" to={`tutors/${item.id}`}> 
                        <ReserveItemComponent item = {item} />
                      // </Link>
              )}
          </div>
        </SwiperSlide>

      ));
    }
  } else if (reservesStatus === 'failed') {
    content = <p>{reservesError}</p>;
  }

  return (
    <div className="reservationswrapper"> 
      <div className="swiperwrap">
        <Swiper
          navigation
          modules={[Navigation, A11y]}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            800: {
              spaceBetween: 15,
              slidesPerView: 2,
            },
            900: {
              spaceBetween: 20,
              slidesPerView: 3,
            },
          }}
        >
          <div>{content}</div>
        </Swiper>
      </div>
    </div>

  );
};

export default MyReservations;
