import React, { useRef } from 'react';
import ShowAlert from './alert';

const Alert = (props) => {
  const setOpen = props.onClick;
  return (
    <div className="max-w-md fixed top-5 right-5 z-40 ">
      <ShowAlert onClick ={setOpen}/>
    </div>
  );
};

export default Alert;
