import React from 'react';

const ViewButton=({getLogs,onRouteChange}) => {
  return(
    <div>
    <button onClick={() => {
      onRouteChange('logs');
      getLogs();
    }} className='pointer f4 link dim br3 ba bw1 ph3 pv2 ma4 dib navy'>View Logs</button>
    </div>
  )
}

export default ViewButton;
