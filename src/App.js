import React,{Component} from 'react';
import Final from './components/Final';
import FinalEdit from './components/FinalEdit';
import StartButton from './components/StartButton';
import ResetButton from './components/ResetButton';
import SaveButton from './components/SaveButton';
import ViewButton from './components/ViewButton';
import Navigation from './components/Navigation';
import Signin from './components/Signin';
import Register from './components/Register';
import UserTexts from './components/UserTexts';
import About from './components/About';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';


const SpeechRecognition =  window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
const initialState ={
  listening:false,
  finalTranscript:'',
  route:'signin',
  isSignedIn:false,
  edit:false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:'',
    joined:'',
    logs:'',
  },
  logs:[],
};

const particlesOptions={
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#919191" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 4,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false, mode: "bubble" },
      onclick: { enable: true, mode: "repulse" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
}

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'


class App extends Component {
  constructor(){
    super();
    this.state=initialState;
    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
    this.reset = this.reset.bind(this);
  }
  onRouteChange=(route) => {
  if(route==='home' || route==='logs' || route==='about'){
    this.setState({isSignedIn:true});
  }
  else if(route==='signout'){
    this.setState(initialState);
  }
  this.setState({route:route});
}

  reset=() => {
    if(this.state.listening===true){
      this.setState({
        listening:false,
        finalTranscript:''
      }, this.handleListen)
    }
    else {
      this.setState({finalTranscript:''})
    }
  }

  loadUser=(data) => {
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }

  toggleListen=() => {
    this.setState({
      listening: !this.state.listening
    }, this.handleListen)
  }

  saveText=() => {
    if(this.state.finalTranscript.length){
      fetch('https://sleepy-lake-61257.herokuapp.com/save',{
        method:'put',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          name:this.state.user.name,
          email:this.state.user.email,
          text:this.state.finalTranscript
        })
      })
      .then(response=>response.json())
      .catch(err=>console.log(err))
    }
    this.setState({finalTranscript:''})
  }

  updateTranscript=(event) => {
    this.setState({finalTranscript:event.target.value})
    console.log(this.state.finalTranscript);
  }

  toggleEdit=(event) => {
    if(this.state.edit===false){
      this.setState({edit:true})
    }
    else{
      this.setState({edit:false})
    }
  }

  textAreaAdjust=(event)=>{
  event.target.style.height = "1px";
  event.target.style.height = (5+event.target.scrollHeight)+"px";
}

  getLogs=() => {
    if(this.state.listening===true){
      this.setState({listening:false},this.toggleListen())
    }
    fetch('https://sleepy-lake-61257.herokuapp.com/posts',{
      method:'post',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        email:this.state.user.email,
        name:this.state.user.name
      })
    })
    .then(response=>response.json())
    .then(data=>this.setState({
      logs:data
    }))
    .catch(err=>console.log(err));
  }

  handleListen=() => {
    if(this.state.listening){
      recognition.start();
      recognition.onresult=(event)=>{
        for(let i=event.resultIndex;i<event.results.length;i++){
          const transcript = event.results[i][0].transcript;
          if(event.results[0].isFinal){
            this.setState({finalTranscript:this.state.finalTranscript+transcript+' '})
          }
        }
      }
      recognition.onend = () => this.handleListen();
    }
    else {
      recognition.stop();
    }
  }
  render(){
    if(this.state.route==='home' && this.state.edit===true){
      return(
        <div className='App'>
          <Particles className='particles' params={particlesOptions} />
          <Navigation route={this.state.route} onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
          <div className='flex flex-column justify-center'>
            <FinalEdit textAreaAdjust={this.textAreaAdjust} updateTranscript={this.updateTranscript} finalTranscript={this.state.finalTranscript}/>
            <p onClick={this.toggleEdit} className='pointer link underline'>Back to recording</p>
          </div>
          <div className='flex justify-center'>
            <SaveButton saveText={this.saveText}/>
          </div>
          <h4 className='mid-gray'>Click on Help in the navigation bar to learn how to use this website</h4>
        </div>
      );
    }
    else if (this.state.route==='home' && this.state.edit===false) {
      return(
        <div className='App'>
          <Particles className='particles' params={particlesOptions} />
          <Navigation route={this.state.route} onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
          <div className='flex flex-column mt2'>
            <h2 className='mid-gray'>{`Welcome ${this.state.user.name}, are you ready to record your logs?`}</h2>
            <div className='flex justify-center'>
              <StartButton onStart={this.toggleListen}/>
              <ResetButton onStop={this.reset}/>
            </div>
            <div className='flex flex-column justify-center'>
                <div className='flex flex-column justify-center'>
                  <Final finalTranscript={this.state.finalTranscript}/>
                  <p onClick={this.toggleEdit} className='pointer link underline'>Edit</p>
                </div>
            </div>
            <div className='flex justify-center'>
              <SaveButton saveText={this.saveText}/>
            </div>
            <h4 className='mid-gray'>Click on Help in the navigation bar to learn how to use this website</h4>
            <div className='flex justify-center'>
              <ViewButton getLogs={this.getLogs} onRouteChange={this.onRouteChange}/>
            </div>
          </div>
        </div>
      );
    }

    else if(this.state.route==='signin' || this.state.route==='signout'){
      return(
        <div className='App'>
          <Particles className='particles' params={particlesOptions} />
          <Navigation route={this.state.route} onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        </div>
      );
    }
    else if(this.state.route==='register'){
      return(
        <div className='App'>
          <Particles className='particles' params={particlesOptions} />
          <Navigation route={this.state.route} onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        </div>
      );
    }
    else if(this.state.route==='about'){
      return(
        <div className='App'>
          <Particles className='particles' params={particlesOptions} />
          <Navigation route={this.state.route} onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
          <About onRouteChange={this.onRouteChange}/>
        </div>
      );
    }
    else if(this.state.route==='logs'){
      return(
        <div className='App'>
          <Particles className='particles' params={particlesOptions} />
          <Navigation route={this.state.route} onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
          <UserTexts logList={this.state.logs} onRouteChange={this.onRouteChange}/>
        </div>
      );
    }

  }
}

export default App;
