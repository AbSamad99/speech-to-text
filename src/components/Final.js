import React from 'react';

const Final=({finalTranscript}) => {
  return(
    <div className='tc items-center flex justify-center flex-column'>
      <h2 className='mid-gray'>Current Log</h2>
      <div className='tc' id='final'>
        {finalTranscript}
      </div>
    </div>
  )
}

export default Final;
