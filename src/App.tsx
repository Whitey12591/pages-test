import React, { Component } from 'react'; // let's also import Component
import './App.css';
import logo from './logo.svg';
import axios from 'axios';
// import { CTA_DTO } from './Data/cta_dto';
import { RootObject, Eta, Ctatt } from './Data/cta_dto';
import TimeCard from './Components/TimeCard/TimeCard';
import * as moment from 'moment';

// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type ClockState = {
  time: Date;
};

interface IState {
  error: boolean;
  isLoaded: boolean;
  arrivals: RootObject;
  time: Date;
  timesRefreshed: number;
}

// Clock has no properties, but the current state is of type ClockState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
export class App extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: false,
      isLoaded: false,
      arrivals: {} as RootObject,
      time: new Date(),
      timesRefreshed: 0
    };
  }

  // The tick function sets the current state. TypeScript will let us know
  // which ones we are allowed to set.
  // tick() {
  //   this.setState({
  //     time: new Date()
  //   });
  // }

  loadData = async () => {
    axios
      .get<RootObject>(
        `${'https://cors-anywhere.herokuapp.com/'}https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=d4102257b59c4a0a82809fec190a2140&outputType=JSON&mapid=40360`
      )
      .then(result => {
        this.setState({
          isLoaded: true,
          arrivals: result.data,
          timesRefreshed: this.state.timesRefreshed + 1
        });
      });
  };

  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, 10000);
  }

  render() {
    const { error, isLoaded, arrivals, timesRefreshed } = this.state;
    if (error) {
      return <div>Error: </div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {arrivals.ctatt.eta.map((time: Eta, key) => (
            // <li key={key}>{moment.utc(time.arrT).format('h:mm:ss a')}</li>
            <TimeCard key={key} eta={time} timesRefreshed={timesRefreshed} />
          ))}
        </ul>
      );
    }
  }
}

export default App;
