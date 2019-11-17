import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import {getDateBefore, getToday, getDateAfter} from "../../../utils";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Fab from "@material-ui/core/Fab";
import DoneIcon from "@material-ui/icons/Done";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import TempBar from "../../TempBar/TempBar";
import ClothesCard from "../../Clothes/ClothesCard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getHistory() {
  return JSON.parse(window.localStorage.getItem('history'));
}

function setHistory(h) {
  window.localStorage.setItem('history', JSON.stringify(h));
}

export default class HistoryDialog extends React.Component {
  constructor(props) {
    super(props);
    const history = getHistory();
    const today = getToday();
    this.state = {
      warmness: history[today].warmness,
      clothes: history[today].clothes,
      date: today,
    }
  }

  canGoBack() {
    const history = getHistory();
    const dateBefore = getDateBefore(this.state.date);
    return dateBefore in history;
  }

  goBack() {
    const history = getHistory();
    const dateBefore = getDateBefore(this.state.date);
    this.setState({
      date: dateBefore,
      clothes: history[dateBefore].clothes,
      warmness: history[dateBefore].warmness
    });
  }

  canGoForward() {
    const history = getHistory();
    const dateAfter = getDateAfter(this.state.date);
    return dateAfter in history;
  }

  goForward() {
    const history = getHistory();
    const dateAfter = getDateAfter(this.state.date);
    this.setState({
      date: dateAfter,
      clothes: history[dateAfter].clothes,
      warmness: history[dateAfter].warmness
    });
  }

  handleWarmnessChange(e) {
    let history = getHistory();
    console.log(e.target.value);
    history[this.state.date].warmness = e.target.value;
    setHistory(history);
  }

  render() {
    const history = getHistory();
    return (
        <Dialog
            fullScreen open={this.props.isOpen}
            onClose={() => this.props.onExit()}
            TransitionComponent={Transition}
        >
          <AppBar className={"AppBar"} style={{position: "sticky"}}>
            <Toolbar style={{display: "flex", background: "#e5f2fc"}}>
              <IconButton edge="start" color="inherit"
                          onClick={this.goBack.bind(this)}
                          disabled={!this.canGoBack()}
                          aria-label="Previous day"
                          style={{color: "gray"}}>
                <NavigateBeforeIcon/>
              </IconButton>

              <div
                  style={{flex: 2, color: "gray", "text-align": "center"}}>
                {this.state.date}
              </div>

              <IconButton edge="start" color="inherit"
                          onClick={this.goForward.bind(this)}
                          disabled={!this.canGoForward()}
                          aria-label="Previous day"
                          style={{color: "gray"}}>
                <NavigateNextIcon/>
              </IconButton>

            </Toolbar>
          </AppBar>
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
            <TempBar
                locked={false}
                defaultValue={history[this.state.date].warmness}
                onChange={this.handleWarmnessChange.bind(this)}
            />
          </div>

          <div className={"TemperatureBar"}>
            <Fab color="primary" aria-label="done" onClick={this.props.onExit}>
              <DoneIcon/>
            </Fab>
          </div>

        </Dialog>
    );

  }
}

HistoryDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired,
};
