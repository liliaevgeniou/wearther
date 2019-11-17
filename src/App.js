import React from 'react';
import Typography from "@material-ui/core/Typography";
import './App.css';
import Weather from './components/Weather/Weather';
import {getToday, getWeather, getClothes} from './utils';
import ClothesCard from "./components/Clothes/ClothesCard";
import EditSuggestionsDialog from "./components/Edit/Suggestions/EditSuggestionsDialog";
import TempBar from "./components/TempBar/TempBar";
import HistoryDialog from "./components/Edit/History/HistoryDialog";
import HistoryIcon from "@material-ui/icons/History";
import Fab from "@material-ui/core/Fab";

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
      },
      warmness: 0,
      isSuggestionsDialogOpen: false,
      isPreviousOutfitDialogOpen: false,
      mounted: false,
    }
  }

  componentDidMount() {
    // Weather
    const today = getToday();
    const history = JSON.parse(window.localStorage.getItem('history'));
    if (history !== null && today in history) {
      const data = history[today];
      this.setState({
        weather: data.weather,
        clothes: data.clothes,
        warmness: data.warmness,
        mounted: true,
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
        let warmness = 0; // TODO CALCULATE

        history2[today] = {
          weather,
          clothes,
          warmness,
        };
        window.localStorage.setItem('history', JSON.stringify(history2));

        this.setState({
          weather,
          clothes,
          warmness,
          mounted: true,
        });
      })
    }
  }

  handleSuggestionsSave(clothes) {
    this.setState({
      clothes,
      isSuggestionsDialogOpen: false,
    });
    const history = JSON.parse(window.localStorage.getItem('history'));
    const today = getToday();
    history[today].clothes = clothes;
    window.localStorage.setItem('history', JSON.stringify(history));
  }

  handleSuggestionsCancel() {
    this.setState({
      isSuggestionsDialogOpen: false,
    });
  }

  render() {
    return (
        <div className={"App"}>
          <Typography
              className={"Title"}
              variant={"h1"}
          >
            <em>Wear</em>ther
          </Typography>

          <div className={"Weather"}>
            <Weather
                icon={this.state.weather.icon}
                temp={this.state.weather.temp}
            />
          </div>

          <div className={"Clothes"}>
            <div className={"Suggestions"}>
              <div className={"Edit"}>
                <div className={"ButtonEditSuggestion"} onClick={
                  () => this.setState({
                    isSuggestionsDialogOpen: true,
                  })
                }
                >
                  edit
                </div>
                <EditSuggestionsDialog
                    key={this.state.clothes.tops + this.state.clothes.bottoms}
                    selectionT={this.state.clothes.tops}
                    selectionB={this.state.clothes.bottoms}
                    isOpen={this.state.isSuggestionsDialogOpen}
                    onSave={this.handleSuggestionsSave.bind(this)}
                    onCancel={this.handleSuggestionsCancel.bind(this)}
                />
              </div>
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
            <TempBar locked={true} defaultValue={this.state.warmness}/>
          </div>

          {
            this.state.mounted ? <HistoryDialog isOpen={this.state.isPreviousOutfitDialogOpen}
                                                onExit={() => this.setState({isPreviousOutfitDialogOpen: false})}
                />
                : []
          }
          <Fab color="primary" aria-label="done" className={"Fab"}
               onClick={() => this.setState({isPreviousOutfitDialogOpen: true})}>
            <HistoryIcon/>
          </Fab>
        </div>
    );
  }
}

export default App;
