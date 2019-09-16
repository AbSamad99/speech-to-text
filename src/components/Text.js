import React from 'react';

const Text=({id,log}) => {
  return(
    <div className='tc items-center flex justify-center flex-column'>
    <h2>{`Log #${id+1}`}</h2>
    <div id='text'>
      {log}
    </div>
    </div>
  )
}

export default Text;
