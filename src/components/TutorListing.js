/* eslint-disable */
import { useEffect, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { selectAllTutors, getTutorsStatus, getTutorsError, fetchTutors } from '../slices/tutorSlice';
import ItemComponent from './ItemComponent';

let content;
// let comp = false;
const TutorListing = ( {delitem} ) => {
  
  const swiperRef = useRef();
  const dispatch = useDispatch()
  const tutors = useSelector(selectAllTutors)
  const tutorsStatus = useSelector(getTutorsStatus)
  const tutorsError = useSelector(getTutorsError)
  console.log(tutors, "-------tutorsListing", tutorsError, "666");
  useEffect(() => {
    if(tutorsStatus === 'idle') {
      dispatch(fetchTutors())
    }
  }, [tutorsStatus, dispatch])
  if (tutorsStatus === 'loading'){
    content = <p className='loading'>Loading...</p>
  } else if (tutorsStatus === 'succeeded') { 
     
    if (tutors.length === 0 || tutors == "Request failed with status code 401"){
      content = <h2 className='addtutor'>Please, add a tutor</h2>
    } else {      
      content = tutors.map((item) => (
        <SwiperSlide key={nanoid()}> 
            <div className='linkwrapper'>
              {delitem ? (
                      // <a className="card"> 
                        <ItemComponent item = {item} delitem={ delitem } />
                      // </a>
              ) : (
                      
                      // <Link className="card" to={`tutors/${item.id}`}> 
                        <ItemComponent item = {item} />
                      // </Link>
              )}
            </div>
        </SwiperSlide>
      ))
    }
  } else if (tutorsStatus === 'failed') {
    content = <p>{tutorsError}</p>
  }
  
  return (
    <>    
    <h1 className='title'><span>Tutors from</span><span>all over the universe</span></h1>
    <div className="swiperwrap">
      <Swiper navigation={true} modules={[Navigation, A11y]} 
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        790: {
          // spaceBetween: 15,
          slidesPerView: 2,
        },
        900: {
          // spaceBetween: 20,
          slidesPerView: 3,
        },
      }}
      >
       
        <div>{content}</div>
      </Swiper>
      
    </div>
   </>
  );
};

export default TutorListing;
