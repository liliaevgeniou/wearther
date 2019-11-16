import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className={"App"}>

        <div className={"Title"}>
          Wearther
        </div>

        <div className={"Weather"}>
          10ºC
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
