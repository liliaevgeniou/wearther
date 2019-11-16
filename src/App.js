import React from 'react';
import './App.css';
import {getWeather, Weather} from './components/Weather/Weather';
import {getDate} from './utils';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: {
        icon: "t01d", // "Thunderstorm with light rain"
        temp: -273.15, // absolute 0
      },
      clothes: {
        tops: [],
        bottoms: [],
      }
    }
  }

  componentDidMount() {
    // Weather
    const date = getDate();
    const history = JSON.parse(window.localStorage.getItem('history'));
    if (history !== null && date in history) {
      const data = history[date];
      this.setState({
        weather: data.weather,
        clothes: data.clothes,
      });
    } else {
      getWeather((weather) => {
        let history2;
        if (history === null) {
          history2 = {};
        } else {
          history2 = history;
        }

        // TODO get clothes
        let clothes = [];

        history2[date] = {
          weather,
          clothes
        };
        window.localStorage.setItem('history', JSON.stringify(history2));

        this.setState({
          weather,
          clothes
        });
      })
    }
  }

  render() {
    return (
        <div className={"App"}>

          <div className={"Title"}>
            Wearther
          </div>

          <div className={"Weather"}>
            <Weather
                icon={this.state.weather.icon}
                temp={this.state.weather.temp}
            />
          </div>

          <div className={"Clothes"}>
            <div className={"Suggestions"}>

              <div className={"TopsSuggestions"}>
                tank top, tshirt, jacket
              </div>
              <div className={"BottomsSuggestions"}>
                dress, tights
              </div>

              <button className={"ButtonEditSuggestion"}>

              </button>
            </div>

          </div>

          <div className={"TemperatureBar"}>

          </div>
          <button className={"ButtonHistory"}>

          </button>
        </div>
    );
  }
}

export default App;
