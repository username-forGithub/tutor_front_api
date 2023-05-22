/* eslint-disable */
import { Link } from 'react-router-dom';
import { useState, Suspense } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { json } from 'react-router-dom';
import { deleteReserve } from '../slices/reservationSlice';
import { Modelphpnew } from './models/Php';
import { ModelReact } from './models/Reactmodel';
import { ModelPython } from './models/Python';
import { ModelRuby } from './models/Ruby';


const ItemComponent = ({ item, delitem }) => {
  const dispatch = useDispatch()
  const [delRequestStatus, setDelRequestStatus] = useState('idle')
  const canDel = delRequestStatus==='idle'
  const reserveClicked = (reserveid) => {
    if (canDel) {
      try {
          setDelRequestStatus('pending')
          dispatch(deleteReserve(reserveid)).unwrap()
      } catch (err) {
          console.error('Failed to delete the tutor', err)
      } finally {
          setDelRequestStatus('idle')
      }
    }
  }

  let subject
  subject = item.incl.subject

  if(subject == "PHP"){
    subject = <Modelphpnew />
  } 
  else if(subject == "ReactJS"){
    subject = <ModelReact />
  }
   else if(subject == "Python"){
    subject = <ModelPython />
  } else if(subject == "Ruby"){
    subject = <ModelRuby />
  }
  console.log("sssssssssssss--> ", item);
  let ss = new Date(Date.parse(item.attr.reservation_date))
  let ee = new Date(Date.parse(item.attr.returning_date))
  return (
    <>
      <div className="card">
          <div className="card-content">
            <div className="image">
              <img src={item.incl.image_url} alt={item.incl.name} />
            </div>
            <div className="social-media">
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faGithub} />
            </div>
            <div className="name-profession">
              <div className="name">{item.attr.city}</div>
              <div className="profession">{subject}</div>              
            </div>
            <div className="datewrapper">
            {ss.toLocaleDateString()} - {ee.toLocaleDateString()}
            </div>
            {
              delitem ? (
                <button type='button' className='delbutton'  onClick={() => reserveClicked(item.attr.id)} >
                  delete
                </button>
              ) : (
                <Link className="button1" to={`tutors/${item.id}`}>
                    <button className="aboutMe">About Me</button>
                </Link>
              )
            }

          </div>     
      </div>      
    </>
  )
}

export default ItemComponent
library.add(far)