import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import PropTypes from "prop-types";
import ClothesCard from "../../Clothes/ClothesCard";
import './EditSuggestionsDialog.css';
import ClothesCardEditable from "../../Clothes/ClothesCardEditable";
import {allTops, allBottoms} from "../../../utils";

/*const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));*/

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class FullScreenDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectionT: this.props.selectionT,
            selectionB: this.props.selectionB,
        };
    }

    handleSave() {
        let clothes = {tops: this.state.selectionT, bottoms: this.state.selectionB};
        this.props.onSave(clothes);
    }

    handleTopNewSelection(type, thickness) {
        let ts = this.state.selectionT;
        ts.push(`${thickness}@${type}`);
        this.setState({selectionT: ts});
    }

    handleTopRemoveSelection(item) {
        let ts = this.state.selectionT;
        this.setState({selectionT: ts.filter(t => t !== item)});
    }

    handleBottomNewSelection(type, thickness) {
        let bs = this.state.selectionB;
        bs.push(`${thickness}@${type}`);
        this.setState({selectionB: bs});
    }

    handleBottomRemoveSelection(item) {
        let bs = this.state.selectionB;
        this.setState({selectionB: bs.filter(b => b !== item)});
    }

    render() {
        return (
            <Dialog
                fullScreen open={this.props.isOpen}
                onClose={() => this.handleSave()}
                TransitionComponent={Transition}
            >
                <AppBar className={"AppBar"} style={{position: "sticky"}}>
                    <Toolbar style={{display: "flex", background: "#e5f2fc"}}>
                        <IconButton edge="start" color="inherit"
                                    onClick={() => this.props.onCancel()} aria-label="close"
                                    style={{flex: 2, color: "gray"}}>
                            <CloseIcon/>
                        </IconButton>
                        <Button autoFocus color="inherit" onClick={() => this.handleSave()}
                                style={{color: "gray"}}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className={"ClothesCardEditableContainer"}>
                    {
                        allTops.map(clothesEntry => {
                            return <ClothesCardEditable
                                key={clothesEntry.type}
                                onClick={(t, th) => this.handleTopNewSelection(t, th)}
                                clothesType={clothesEntry.type}
                                variants={clothesEntry.variants.map(v => v.thickness)}
                            />
                        })
                    }
                </div>
                <div className={"ClothesCardEditableContainer"}>
                    {
                        allBottoms.map(clothesEntry => {
                            return <ClothesCardEditable
                                key={clothesEntry.type}
                                onClick={(t, th) => this.handleBottomNewSelection(t, th)}
                                clothesType={clothesEntry.type}
                                variants={clothesEntry.variants.map(v => v.thickness)}
                            />
                        })
                    }
                </div>

                <div className={"ClothesCardEditableContainerFooter"}>
                    <b>{"Tops: "}</b> {this.state.selectionT.join(" ")}
                    <br/>
                    <br/>
                    <b>{"Bottoms: "}</b> {this.state.selectionB.join(" ")}
                </div>
            </Dialog>
        );
    }
}

FullScreenDialog.propTypes = {
    selectionT: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectionB: PropTypes.arrayOf(PropTypes.string).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};
