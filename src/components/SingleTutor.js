/* eslint-disable */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { selectTutorById, fetchTutors } from '../slices/tutorSlice';
import useAuth from '../hooks/useAuth';
import rocket from '../images/rocket.png';
import big from '../images/big1.webp'
const SingleTutor = () => {
  let [pic, setPic] = useState(false);
  const { tutorId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { visitedids, setVisitedids } = useAuth(); 

  const tutor = useSelector((state) => selectTutorById(state, tutorId));

  if (!tutor) {
    dispatch(fetchTutors());
    return (
      <p>loading...</p>
    );
  }

  const onReserve = (tutId) => {
    setPic(true)
    const ss = setTimeout(()=>{
           navigate(`/addreserve/${tutId}`);
        }, 2500)
    return () => clearTimeout(ss);
  };

  const obj = tutor.attributes;
  let content = [];
  for (let [key, value] of Object.entries(obj)) {
    if (key === "id" || key === "image_url") { continue; }
    if (key === "experience"){
      if(value == 1){
        value = `${value} year`
      } else {
        value = `${value} years`
      }
      
    }
    content.push(

      <div key={key} className="rightcontent">
        <div className='key'>{key}</div>
        <div className='value'>{value}</div>
      </div>
    ) 
  }

  return (
    <>
    <div className= { pic ? 'singleWrapper opac' : 'singleWrapper'}>
      <aside>
        <div className='outerwrapper'>
          <div className="rocketwrapper">
            <img className='rocket' src={rocket}/>
          </div>
          <div className='maskouter'>
            <div className="maskclass">        
              <img className="singleImage" src={tutor.attributes.image_url} alt={tutor.attributes.name} />
            </div>
          </div>
        </div>
      </aside>    
      <article>

        <div className="subarticle">{content}</div>
        
        <button
          type="button"
          onClick={() => onReserve(tutor.id)}
        >
          Reserve
        </button>
        
      </article>
    </div>
    
      { pic &&
        <div className='bigwrapper'>
          <img src={big} className='bigimage' /> 
        </div>
      }
  
    </>
  );
};

export default SingleTutor;
