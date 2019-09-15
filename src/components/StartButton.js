import React from 'react';

const StartButton=({onStart}) => {
  return(
    <div>
    <button onClick={onStart} className='pointer f4 link dim br3 ba bw1 ph3 pv2 ma4 dib blue'>Start/Stop</button>
    </div>
  )
}

export default StartButton;
