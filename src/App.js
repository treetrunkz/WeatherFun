import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
// axios is for URL requests
//using state is used when data is meant to be changed,
//the axios response runs automatically within a milisecond

// the first thing that hppens is the constructor runs, the constructor gets it all set up
//then render
class App extends Component {
  constructor(){
    super();
    //this will create state and the async will be send to this.
    this.state = {
      temp: "",
      cityName: "",
      weather: "",
      high: "",
      low: "",
      icon: "",
      name: "",    
      isRaining: "",
      weatherImage: ""
    }
    }

    // this is accessed last in the process of creating this dynamic content
    componentDidUpdate(prevProps, prevState){
      console.log(prevProps)
    }
    

  componentDidMount(){
    //this renders the object
    this.getCityWeather('Seattle');
    var elems = document.querySelectorAll('.modal');
    var instaces = window.M.Modal.init(elems);
  }
//this is one of the last parts of updating, it is compoenentDidUpdate(prevProps, PrevState, snapshot)
// another dynamic type of updating, this can be used to communicate between updated behaviors I think
  getCityWeather = (city)=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d`
    axios.get(url).then((resp)=>{
      this.setState({
        temp: resp.data.main.temp,
        high: resp.data.main.temp_max,
        low: resp.data.main.temp_min,
        weather: resp.data.weather[0].description,
        icon: resp.data.weather[0].icon,
        cityName: resp.data.name
      })
    })
  }


componentDidUpdate(prevProps, prevState){
  if(this.state.weather !== prevState.weather){
    const isMisty = this.state.weather.includes("mist");
    const isSnowing = this.state.weather.includes("snow");
    const isRaining = this.state.weather.includes("rain");
    if(isRaining){
      this.setState({
        isRaining: "Umbrella"
      })
    }
    if(isSnowing){
      this.setState({
        isSnowing: "Snow Shoes"
      })
    }
    if(isMisty){
      this.setState({
        isSnowing: "Visibility"
      })
    }
  }
  
  }



  searchCity = (e)=>{
    e.preventDefault();
    const city = document.getElementById('city').value;
    this.getCityWeather(city);
  }


  //this is accessed Second, important to remember, it must be because this must exist for 
  //the information from component to have somewhere to live.
  render(){ 
    const iconUrl = `http://openweathermap.org/img/w/${this.state.icon}.png`
    const weatherImage = `appimages/${this.state.icon}.jpg`
     return (
    <div className="App">
      <div class="card" style={{ width: '18rem' }}>
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src={weatherImage}></img>
        </div>
    <div class="card-content">          
      <span class="card-title activator grey-text text-dark-4">{this.state.cityName}<i class="material-icons-right"><img src={iconUrl}></img></i></span>
      <h4>High: {this.state.high} - Low: {this.state.low}</h4>
      <p>{this.state.isRaining}</p>
      
    </div>
    <div class="card-reveal">
    <span class="card-title activator grey-text text-dark-4">{this.state.cityName}<i class="material-icons-right"><img src={iconUrl}></img></i></span>
            <h4>High: {this.state.high} - Low: {this.state.low}</h4>
            <p>Do bring today:</p>
            <p>{this.state.isRaining}</p>
          
          <div className="row">
            <div className="col s6 offset-s3">
              <form onSubmit={this.searchCity}>
            <input type="text" id="city" placeholder="City..."></input>
            </form>
          </div>
          </div>
    </div>
          
          </div>
        </div>
  );
}
}
export default App;
