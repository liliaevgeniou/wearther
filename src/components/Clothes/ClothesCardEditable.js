import React from "react";
import ClothesCard from "./ClothesCard";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import './ClothesCardEditable.css';

export default class ClothesCardEditable extends React.Component {
    render() {

        return (
            <Card className={"ClothesCardEditable"} style={{background: "#f8f8f8"}}>
                <ClothesCard clothesType={this.props.clothesType} thickness={""}/>
                {
                    this.props.variants.map(thickness => {
                        return (
                            <Button
                                variant={"outlined"}
                                size={"small"}
                                onClick={() => this.props.onClick(this.props.clothesType, thickness)}
                                key={thickness}
                            >
                                {thickness}
                            </Button>
                        );
                    })
                }
            </Card>
        );

    }
}

ClothesCardEditable.propTypes = {
    clothesType: PropTypes.string.isRequired,
    variants: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func.isRequired,
};
