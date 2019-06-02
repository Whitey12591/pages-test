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
      time: new Date()
    };
  }

  // The tick function sets the current state. TypeScript will let us know
  // which ones we are allowed to set.
  tick() {
    this.setState({
      time: new Date()
    });
  }

  // Before the component mounts, we initialise our state
  // componentWillMount() {
  //   this.tick();
  // }

  // After the component did mount, we set the state each second.
  componentWillMount() {
    axios
      .get<RootObject>(
        `${'https://cors-anywhere.herokuapp.com/'}https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=d4102257b59c4a0a82809fec190a2140&outputType=JSON&mapid=40360`
      )
      .then(result => {
        // debugger;
        this.setState({
          isLoaded: true,
          arrivals: result.data
        });
        // console.log(this.state.arrivals);
      });
  }

  // // render will know everything!
  // render() {
  //   const { arrivals } = this.state;
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />

  //         {/* <div>
  //           {arrivals && (
  //             <div>
  //               {arrivals.ctatt && (
  //                 <div>
  //                   {arrivals.ctatt.eta && (
  //                     <div>
  //                       {arrivals.ctatt.eta.map((time: CTA_DTO.Eta, key) => {
  //                         return (
  //                           <div key={key}>
  //                             <TimeCard times={time} />
  //                           </div>
  //                         );
  //                       })}
  //                     </div>
  //                   )}
  //                 </div>
  //               )}
  //             </div>
  //           )}
  //         </div> */}

  //         <a
  //           className="App-link"
  //           href="https://reactjs.org"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Learn React
  //         </a>
  //       </header>
  //     </div>
  //   );
  // }

  render() {
    const { error, isLoaded, arrivals } = this.state;
    if (error) {
      return <div>Error: </div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {arrivals.ctatt.eta.map((time: Eta, key) => (
            // <li key={key}>{moment.utc(time.arrT).format('h:mm:ss a')}</li>
            <TimeCard key={key} eta={time} />
          ))}
        </ul>
      );
    }
  }
}

export default App;
