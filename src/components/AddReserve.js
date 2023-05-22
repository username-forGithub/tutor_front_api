/* eslint-disable */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addReserveTutor } from '../slices/reservationSlice';
import big from '../images/second.gif'

const AddReserve = () => {
  const CITIES = ['Dallas', 'New York', 'Texas'];
  const [city, setCity] = useState('Dallas');
  const todayDateObject = new Date();
  const tomorrowDateObject = new Date();
  todayDateObject.setDate(todayDateObject.getDate());
  tomorrowDateObject.setDate(tomorrowDateObject.getDate() + 1);
  const today = todayDateObject.toISOString().substring(0, 10);
  const tomorrow = tomorrowDateObject.toISOString().substring(0, 10);
  const [resDate, setResDate] = useState(today);
  const [retDate, setRetDate] = useState(tomorrow);
  const { tutorId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const canSave = addRequestStatus === 'idle';

  const onReserve = (e) => {
    e.preventDefault();
    const tutReserved = {
      city,
      tutor_id: tutorId,
      reservation_date: resDate,
      returning_date: retDate,

    };
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(
          addReserveTutor(tutReserved),
        ).unwrap();
      } catch (err) {
        console.log('Failed to save the tutor', err);
      } finally {
        navigate('/reservedtutors');
        setAddRequestStatus('idle');
      }
    }
  };
  return (
    <>
      <div className="addReserveWrapper">
        <section className="addreserve">
          <form id="reserve" onSubmit={onReserve}>

            {/*  City */}
            <label htmlFor="cities">
              City:
              <br />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                name="cities"
                id="cities"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>

            {/*  Reserve Date */}
            <label htmlFor="reserveDate">
              Start Date:
              <br />
              <input
                className="reserve-date"
                id="reserveDate"
                type="date"
                value={resDate}
                onChange={(e) => setResDate(e.target.value)}
              />
            </label>

            {/*  Return Date */}
            <label htmlFor="returnDate">
              End Date:
              <br />
              <input
                id="returnDate"
                type="date"
                value={retDate}
                onChange={(e) => setRetDate(e.target.value)}
                required
              />
            </label>
            <br />

            <button type="submit">
              Reserve
            </button>
          </form>
        </section>
      </div>
      <div className='bigwrapper addres active'>
        <img src={big} className='bigimage' /> 
      </div>
    </>
  );
};

export default AddReserve;
