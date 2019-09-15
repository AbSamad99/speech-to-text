import React from 'react';

const About=({onRouteChange}) => {
  return(
    <div className='mt2'>
      <h2 className='ma0 mid-gray'>How to use:</h2>
      <div className='tc items-center flex justify-center flex-column'>
        <ol type='1' className='dib tl'>
          <li className='mv4 f4'>Click on the <button className='pointer f4 link dim br3 ba bw1 ph1 pv1 blue'>Start/Stop</button> button to start/stop recording</li>
          <li className='mv4 f4'>If you want to clear the text, click on the <button className='pointer f4 link dim br3 ba bw1 ph1 pv1 red'>Reset</button> button</li>
          <li className='mv4 f4'>When you are done, click on the <button className='pointer f4 link dim br3 ba bw1 ph1 pv1 dark-green'>Save</button> button to save your log</li>
          <li className='mv4 f4'>You can also edit your log as you see fit before saving</li>
          <li className='mv4 f4'>To view your logs, click on the <button className='pointer f4 link dim br3 ba bw1 ph1 pv1 navy'>View Logs</button> button</li>
        </ol>
        <button onClick={() => {onRouteChange('home')}} className='pointer f4 link dim br3 ba bw1 ph3 pv2 mb4 dib orange'>Go Back</button>
      </div>
    </div>
  )
}

export default About;
