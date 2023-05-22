/* eslint-disable */
const ArrayToString = (arr) => { 
  let langstring = "";
  arr.forEach((element, ind) => {
    langstring += element.value
    if (!Object.is(arr.length - 1, ind)) {
      langstring += ", "
    }        
  });
  return langstring;
}

export default ArrayToString