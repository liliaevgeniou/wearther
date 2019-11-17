import React from 'react';
import Typography from "@material-ui/core/Typography";
import './App.css';
import Weather from './components/Weather/Weather';
import {getDate, getWeather, getClothes} from './utils';
import ClothesCard from "./components/Clothes/ClothesCard";

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

        let clothes = getClothes(history2);

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
          <Typography
              className={"Title"}
              variant={"h1"}
          >
            Wearther
          </Typography>

          <div className={"Weather"}>
            <Weather
                icon={this.state.weather.icon}
                temp={this.state.weather.temp}
            />
          </div>

          <div className={"Clothes"}>
            <div className={"Suggestions"}>

              <div className={"TopsSuggestions"}>
                {
                  this.state.clothes.tops.map(strClothes => {
                    // strClothes = "Thin@Tanktop/Sleeveless" e.g.
                    let [thickness, clothesType] = strClothes.split("@");
                    return <ClothesCard
                        key={strClothes}
                        clothesType={clothesType}
                        thickness={thickness}
                    />;
                  })
                }
              </div>
              <div className={"BottomsSuggestions"}>
                {
                  this.state.clothes.bottoms.map(strClothes => {
                    // strClothes = "Thick@Trousers" e.g.
                    let [thickness, clothesType] = strClothes.split("@");
                    return <ClothesCard
                        key={strClothes}
                        clothesType={clothesType}
                        thickness={thickness}
                    />;
                  })
                }
              </div>
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
