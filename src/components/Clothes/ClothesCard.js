import React from "react";
import PropTypes from "prop-types";
import "./ClothesCard.css";
import Card from "@material-ui/core/Card";
import {Typography} from "@material-ui/core";

export default class ClothesCard extends React.Component {
    render() {
        return (
            <Card className={"ClothesCard"} style={{background: "#f8f8f8"}}>
                <Typography variant={"h6"}>
                    {this.props.thickness} {this.props.clothesType}
                </Typography>
            </Card>
        );

    }
}

ClothesCard.propTypes = {
    clothesType: PropTypes.string.isRequired,
    thickness: PropTypes.string.isRequired,
};
