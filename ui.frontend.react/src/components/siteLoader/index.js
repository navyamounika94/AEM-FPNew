import React from 'react';
import loaderJson from './loader.json';
import lottie from 'lottie-web'
require('./siteloader.css');

export default class SiteLoader extends React.PureComponent {

    constructor(props) {
        super(props);
        this.loaderDiv = React.createRef();
    }

    componentDidMount() {
        if (this.loaderDiv) {
            lottie.loadAnimation({
                animationData: loaderJson,
                autoplay: true,
                container: this.loaderDiv.current,
                loop: true,
                renderer: 'svg',
            });
        }
    }

    render() {
        return (
            <div className="site-loader-container site-loader-new">
                <div
                    className="site-loader"
                    ref={this.loaderDiv}
                />
            </div>
        );
    }
}