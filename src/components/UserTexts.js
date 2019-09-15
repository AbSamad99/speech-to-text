import React from 'react';
import Text from './Text'

const UserTexts=({onRouteChange,logList}) => {
  console.log(logList);
  const allLogs=logList.map((log,i) => {
    return <Text id={i} log={log.data}/>
  })
  if(allLogs.length){
    return(
      <div>
        <h1>Your Logs</h1>
        <div>{allLogs}</div>
        <button onClick={() => {onRouteChange('home')}} className='pointer f4 link dim br3 ba bw1 ph3 pv2 ma4 dib orange'>Go Back</button>
      </div>
    )
  }
  else{
    return(
      <div>
        <h2>You do not appear to have recorded any logs</h2>
        <button onClick={() => {onRouteChange('home')}} className='pointer f4 link dim br3 ba bw1 ph3 pv2 ma4 dib orange'>Go Back</button>
      </div>
    )
  }
}

export default UserTexts;
