import React from 'react';
import microphone from './microphone.png';
import Tilt from 'react-tilt';

function Navigation({isSignedIn,onRouteChange,route}){
    if(isSignedIn){
      if(route==='home'){
        return(
          <nav className="dt w-100 border-box ph5-ns mt3">
          <Tilt className="Tilt pt1" options={{ max : 35 }} style={{ height: 100, width: 100 }} >
            <img src={microphone} className="pa2 br-100 ba w-75 h-75 dib" alt="x"/>
          </Tilt>
            <div className="dtc v-mid w-75 tr">
              <p onClick={() => onRouteChange('about')} className="link pointer dim dark-gray f6 f4-ns dib mr3 mr4-ns"  title="about">Help</p>
              <p onClick={() => onRouteChange('signout')} className="link pointer dim dark-gray f6 f4-ns dib mr3 mr4-ns"  title="Signout">Sign out</p>
            </div>
          </nav>
        );
      }
      else{
        return(
          <nav className="dt w-100 border-box ph5-ns mt3">
          <Tilt className="Tilt pt1" options={{ max : 35 }} style={{ height: 100, width: 100 }} >
            <img src={microphone} className="pa2 br-100 ba w-75 h-75 dib" alt="x"/>
          </Tilt>
            <div className="dtc v-mid w-75 tr">
              <p onClick={() => onRouteChange('signout')} className="link pointer dim dark-gray f6 f4-ns dib mr3 mr4-ns"  title="Signout">Sign out</p>
            </div>
          </nav>
        );
      }
    }
    else{
      return(
        <nav className="dt w-100 border-box ph5-ns">
          <div className="dtc v-mid w-75 tr">
            <p onClick={() => onRouteChange('signin')} className="link pointer dim dark-gray f6 f4-ns dib mr3 mr4-ns"  title="Signin">Signin</p>
            <p onClick={() => onRouteChange('register')} className="link pointer dim dark-gray f6 f4-ns dib"  title="Register">Register</p>
          </div>
        </nav>
      );
    }
  }

export default Navigation;
