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
        this.state = {}
    }

    handleExit() {
        let clothes = {tops: [], bottoms: []}; // TODO selected clothes
        this.props.onExit(clothes); // TODO pass state out
    }

    render() {
        return (
            <Dialog
                fullScreen open={this.props.isOpen}
                onClose={() => this.handleExit()}
                TransitionComponent={Transition}
            >
                <AppBar>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => this.props.onCancel()} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Button autoFocus color="inherit" onClick={() => this.handleExit()}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    hi
                </List>
            </Dialog>
        );
    }
}

FullScreenDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onExit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};
