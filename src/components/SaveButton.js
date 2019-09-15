import React from 'react';

const SaveButton=({saveText}) => {
  return(
    <div>
    <button onClick={saveText} className='pointer f4 link dim br3 ba bw1 ph3 pv2 ma4 dib dark-green'>Save</button>
    </div>
  )
}

export default SaveButton;
