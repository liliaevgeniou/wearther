import React from "react";
import PropTypes from "prop-types";
import "./ClothesCard.css";
import Card from "@material-ui/core/Card";
import {Typography} from "@material-ui/core";
import shortSleeveShirt from './clothes_icons/shortsleeveshirt.png';
import longSleeveShirt from './clothes_icons/longsleeveshirt.png';
import tanktop from './clothes_icons/tanktop.png';
import sweater from './clothes_icons/sweater.png';
import jacket from './clothes_icons/jacket.png';
import coat from './clothes_icons/coat.png';
import shorts from './clothes_icons/shorts.png';
import trousers from './clothes_icons/trousers.png';
import skirt from './clothes_icons/skirt.png';
import tights from './clothes_icons/tights.png';

export default class ClothesCard extends React.Component {
    render() {
        let imgSrc;

        if (this.props.clothesType === "Short-Sleeve Shirt") {
            imgSrc = shortSleeveShirt;
        }
        if (this.props.clothesType === "Long-Sleeve Shirt") {
            imgSrc = longSleeveShirt;
        }
        if (this.props.clothesType === "Tanktop/Sleeveless") {
            imgSrc = tanktop
        }
        if (this.props.clothesType === "Sweater") {
            imgSrc = sweater
        }
        if (this.props.clothesType === "Jacket") {
            imgSrc = jacket
        }
        if (this.props.clothesType === "Coat") {
            imgSrc = coat
        }

        if (this.props.clothesType === "Shorts") {
            imgSrc = shorts
        }
        if (this.props.clothesType === "Trousers") {
            imgSrc = trousers
        }
        if (this.props.clothesType === "Skirt") {
            imgSrc = skirt
        }
        if (this.props.clothesType === "Tights") {
            imgSrc = tights
        }


        return (
            <Card className={"ClothesCard"} style={{background: "#f8f8f8"}}>
                <img
                    className={"ClothesCardImg"}
                    src={imgSrc}
                    alt={this.props.clothesType + " icon"}
                />
                <Typography variant={"body1"}>
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
