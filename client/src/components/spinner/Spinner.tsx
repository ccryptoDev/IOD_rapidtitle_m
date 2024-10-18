import React, { Fragment } from 'react';
import spinner from './spinner.gif';
import { useSelector } from 'react-redux';


const Spinner = () => {
  const loadingStatus = useSelector((state:any) => state.loading.loading);
  return <div className={`flex items-center fixed bg-black bg-opacity-70 z-20 w-full h-full ${loadingStatus ? '' : 'hidden'}`}>
    <Fragment>
      <img 
        src={spinner}
        style={{ width: '100px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </Fragment>
  </div>
};

export default Spinner;
