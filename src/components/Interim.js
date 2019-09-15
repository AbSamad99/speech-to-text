import React from 'react';

const Interim=({interimTranscript}) => {
  return(
    <div className='tc items-center flex justify-center flex-column'>
      <h1 className='f5 f2-ns fw6 mid-gray'>Interim Text</h1>
      <div id='interim'>
        {interimTranscript}
      </div>
    </div>
  )
}

export default Interim;
