import React from 'react';

const FinalEdit=({finalTranscript,updateTranscript,textAreaAdjust}) => {
  return(
    <div className='tc items-center flex justify-center flex-column'>
      <h2 className='mid-gray'>Editing Log</h2>
      <textarea rows='1' onClick={textAreaAdjust} className='tc' value={finalTranscript} onKeyDown={textAreaAdjust} onKeyUp={updateTranscript} onChange={textAreaAdjust} onInput={updateTranscript} ></textarea>
    </div>
  )
}

export default FinalEdit;
