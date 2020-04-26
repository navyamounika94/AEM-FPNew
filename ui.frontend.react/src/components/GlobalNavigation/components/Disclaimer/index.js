import axios from 'axios';
import { default as canUseDOM } from 'can-use-dom';
import React,{Component} from 'react';
import { Popover, PopoverBody } from 'reactstrap';

let disclaimerIdCounter = 0;
function generateId() {
    disclaimerIdCounter++;
    return 'disclaimerId-' + disclaimerIdCounter;
}

class Disclaimer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            message: 'Loading...'
        };
        this.id = generateId();
        this.popoverDiv = React.createRef();
        this.ignoreTouch = false;
    }


    toggle = () => {
        if (!this.state.isOpen) {
            this.ignoreTouch = true;
            this.setState({
                isOpen: true
            });

            setTimeout(
                () => {
                    this.ignoreTouch = false;
                },
                500
            );
        } else {
            if (!this.ignoreTouch) {
                this.setState({
                    isOpen: false
                });
            }
        }
    }

    handleClick = (e) => {
        if (this.state.isOpen) {
            const div = this.popoverDiv.current;
            if (!!div && div.contains(e.target)) {
                return;
            }

            this.toggle();
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false);

    }

    render() {
        if (!canUseDOM) {
            return null;
        }

        return (
            <>
                <span
                    className="disclaimer-trigger"
                    id={this.id}
                    onClick={(e) => {
                        e.preventDefault();

                        // NOTE: This is a current-gen service. It won't work in environments without the current-gen backend
                        // For testing and development, just change the url to any current-gen endpoint 'https://drivers.lexus.com/lexusdrivers/...'
                        // and disable CORS checks on your web-browser
                        if (this.state.message === 'Loading...') {
                            axios({
                                url: `/lexusdrivers/disclaimers?disclaimersID=${this.props.code}`
                            })
                            .then((response) => {
                                console.log('DISCLAIMER: ', response.data);
                                const message =
                                    response.data &&
                                    response.data[this.props.code];

                                this.setState({
                                    message: (!!message) ? message : 'Error fetching data'
                                });
                            })
                            .catch((err) => {
                                this.setState({
                                    message: 'Error fetching data'
                                });
                            });
                        }

                        this.toggle();
                    }}
                >
                    *
                </span>
                <Popover
                    target={this.id}
                    isOpen={this.state.isOpen}
                    toggle={this.toggle}
                    className="ld-disclaimer"
                >
                    <PopoverBody>
                        <div ref={this.popoverDiv}>
                        <div className="close-popover" onClick={this.toggle}>X</div>
                        {this.state.message}
                        </div>
                    </PopoverBody>
                </Popover>
            </>
        );
    }
}

export default Disclaimer;