import React from 'react';
import PropTypes from 'prop-types';
import Slider from "@material-ui/core/Slider";
import './TempBar.css';

export default class TempBar extends React.Component {
  render() {
    return (
        <Slider
            className={"TempBar"}
            defaultValue={this.props.defaultValue}
            onChange={this.props.onChange}
            disabled={this.props.locked}
            marks
            min={-5}
            max={5}
            aria-label={"How did it feel? Too cold? Too hot?"}
        />
    );
  }
}

TempBar.propTypes = {
  locked: PropTypes.bool.isRequired,
  defaultValue: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};
