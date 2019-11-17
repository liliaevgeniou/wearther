import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

export default class Weather extends React.Component {
  render() {
    return (
        // Weather card color set HERE!!! css
        <Card style={{background: "#f8f8f8"}}>
          <Typography
              variant="h3"
              component="h3"
              style={{"paddingTop": "1vh"}}
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
