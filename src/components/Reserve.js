import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addReserveTutor } from '../slices/reservationSlice';
import {
  selectAllTutors,
  getTutorsStatus,
  fetchTutors,
} from '../slices/tutorSlice';

const Reserve = () => {
  const CITIES = ['Dallas', 'New York', 'Texas'];
  const [city, setCity] = useState('Dallas');
  const [tutor, setTutor] = useState('');
  const todayDateObject = new Date();
  const tomorrowDateObject = new Date();
  todayDateObject.setDate(todayDateObject.getDate());
  tomorrowDateObject.setDate(tomorrowDateObject.getDate() + 1);
  const today = todayDateObject.toISOString().substring(0, 10);
  const tomorrow = tomorrowDateObject.toISOString().substring(0, 10);
  const [resDate, setResDate] = useState(today);
  const [retDate, setRetDate] = useState(tomorrow);

  // const { tutorId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tutors = useSelector(selectAllTutors);
  const tutorsStatus = useSelector(getTutorsStatus);
  // const tutorsError = useSelector(getTutorsError)

  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const canSave = addRequestStatus === 'idle';

  useEffect(() => {
    if (tutorsStatus === 'idle') {
      dispatch(fetchTutors());
    }
    if (tutors.length > 0) {
      setTutor(tutors[0].id);
    }
  }, [tutorsStatus, dispatch]);

  const onReserve = (e) => {
    e.preventDefault();
    const tutReserved = {
      city,
      tutor_id: tutor,
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
        setAddRequestStatus('idle');
        navigate('/reservedtutors');
      }
    }
  };

  return (
    <section>
      <form id="reserve" onSubmit={onReserve}>

        {/* Tutor */}
        <label htmlFor="tutors">
          Tutor:
          <br />
          <select
            value={tutor}
            onChange={(e) => setTutor(e.target.value)}
            name="tutors"
            id="tutors"
          >
            {tutors.map((tutor) => (
              <option key={tutor.id} value={tutor.id}>
                {tutor.name}
              </option>
            ))}
          </select>
        </label>

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
          Reserve Date:
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
          Return Date:
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
  );
};

export default Reserve;
