/* eslint-disable */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewTutor } from '../slices/tutorSlice';
import useAuth from '../hooks/useAuth';
import Select from 'react-select';
import ArrayToString from './ArrayToString';
// import { selectAllTutors } from "../users/usersSlice";

const AddTutor = () => {
  const { auth } = useAuth();
  const optSubject = [
    { value: 'ReactJS', label: 'ReactJS' },
    { value: 'Python', label: 'Python' },
    { value: 'Ruby', label: 'Ruby' },
    { value: 'PHP', label: 'PHP' }
  ]
  const optExperience = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' }
  ]
  const optLanguage = [
    { value: 'English', label: 'English' },
    { value: 'French', label: 'French' },
    { value: 'Arabic', label: 'Arabic' }
  ]

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [priceFocus, setPriceFocus] = useState(false)
  let [experience, setExperience] = useState("")
  let [language, setLanguage] = useState('')
  let [subject, setSubject] = useState()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState();
  const [price, setPrice] = useState('');
  const [timing, setTiming] = useState(true)
   
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onDescriptionChanged = (e) => setContent(e.target.value);
  const onImageChanged = (e) => setImage(e.target.files[0]);
  const onPriceChanged = (e) => setPrice(e.target.value);
  
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const canSave = [title, content, image].every(Boolean) && addRequestStatus === 'idle';
  const onSaveTutorClicked = (e) => {
    e.preventDefault();
    if(subject){      
      subject = subject.value
    }
    if(experience){      
      experience = experience.value
    }
    if(language){
      language = ArrayToString(language)
    } 
    const data = new FormData();
    data.append("tutor[name]", title);
    data.append("tutor[image]", image);
    data.append("tutor[price]", price);
    data.append("tutor[description]", content);
    data.append("tutor[lang]", language);
    data.append("tutor[subject]", subject);
    data.append("tutor[experience]", experience);
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(
          addNewTutor(
            data
          ),
        ).unwrap();

        setTitle('');
        setContent('');
        setImage('');
        setPrice('');

        navigate('/');
      } catch (err) {
        console.log('Failed to save the post', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

 function customTheme(theme) {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary25: '#d0cece',
      primary: 'green',
    }
  }
 }

 const handleBlur = () => {
  if(!price){
    setPriceFocus(false)
  }
 }

 useEffect(()=>{  
    setTiming(false)
 }, [])

  return (
    <div className = {timing ? 'addTutorWrapper' : 'addTutorWrapper active'}>
      <section className="addTutorSection">
        <h2>New Tutor</h2>
        <form onSubmit={onSaveTutorClicked}>
          <div className="choose firstline">
            <label id="titlename" htmlFor="name">            
              <input
                required
                type="text"
                id="name"
                name="name"
                value={title}
                onChange={onTitleChanged}
              />
              <span className='placeholder'>Name</span>            
            </label>
            <label htmlFor="image">
              <div className="uploadwrapper">
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={onImageChanged}
                  required
                />

              </div>
            </label>
          </div>
          <div className="choose">
            <label id="subject" htmlFor="subjects1">
              <Select 
                id="subjects1"
                theme={customTheme}
                placeholder=""
                options={optSubject}
                onChange={setSubject}
                // isMulti 
              />
            </label>
            <label id="experience" htmlFor="experiences1">
              <Select 
                id="experiences1"
                placeholder=""
                theme={customTheme}
                options={optExperience}
                onChange={setExperience}
              />
            </label>
          </div>
          <div className="choose">
            <label id="language" htmlFor="language1">
              <Select 
                id="language1"
                placeholder=""
                theme={customTheme}
                options={optLanguage}
                onChange={setLanguage}
                isMulti 
              />
              {/* <span className='placeholder'>Language</span> */}
            </label>
            <label htmlFor="price" className="price">
              <div className="css-b62m3t-container price-wrapper">
                <div className= {priceFocus ? "css-10xc5sb-control" : "css-13cymwt-control"}>
                  <input
                    onFocus={() => setPriceFocus(true)}
                    onBlur={() => handleBlur()}
                    type="number"
                    id="price"
                    onChange={onPriceChanged}
                    value={price}                  
                  />
                  <span className='placeholder'>Price ($)</span>
                </div>              
              </div>
            </label>
          </div>
          <label id="arealabel" htmlFor="tutorContent">
            <textarea
              id="tutorContent"
              name="tutorContent"
              value={content}
              onChange={onDescriptionChanged}
              required
            />
            <span className='placeholder'>Description</span>
          </label>
          <button
            type="submit"
            disabled={!canSave}
          >
            Save
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddTutor;
