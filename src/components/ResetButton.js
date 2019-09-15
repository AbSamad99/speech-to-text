import React from 'react';

const ResetButton=({onStop}) => {
  return(
    <div>
    <button onClick={onStop} className='pointer f4 link dim br3 ba bw1 ph3 pv2 ma4 dib red'>Reset</button>
    </div>
  )
}

export default ResetButton;
