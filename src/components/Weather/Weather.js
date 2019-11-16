import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import keyObj from './rapidAPIkey';

function getWeather(f) {
  let lon = 51.7520;
  let lat = 1.2577;

  navigator.geolocation.getCurrentPosition(position => {
    lon = position.coords.longitude;
    lat = position.coords.latitude;

    fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/current?lang=en&lon=${lon}&lat=${lat}`,
        {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
            "x-rapidapi-key": keyObj.key,
          },
        })
        .then(response => response.json())
        .then(response => {
          const data = response.data[0];
          f({
            temp: data["temp"],
            icon: data["weather"]["icon"],
          });
        })
        .catch(err => {
          console.log(err);
        });
  })
}


class Weather extends React.Component {
  render() {
    return (
        // Weather card color set HERE!!! css
        <Card style={{background: "#f8f8f8"}}>
          <Typography
              variant="h3"
              component="h3"
              style={{"padding-top": "1vh"}}
          >
            {this.props.temp}ºC
          </Typography>
          <img
              src={`https://www.weatherbit.io/static/img/icons/${this.props.icon}.png`}
              alt="Weather icon"
          />
        </Card>
    );
  }
}

Weather.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
};

export {getWeather, Weather}
