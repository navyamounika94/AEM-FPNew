import { Image as SitecoreImage } from '@sitecore-jss/sitecore-jss-react';
import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';

class Image extends Component {
    constructor(props) {
        super(props);
        this.field = {
            value: {
                src: '',
            }
        };
        this.lazyLoad = true;
    }

    render() {
        const {field, lazyLoad, ...otherProps} = this.props;
        if (field.value) {
            if (field.value.style) {
                delete field.value.style;
            }
            if (field.value.height) {
                delete field.value.height;
            }
        }

        if (lazyLoad) {
            return(
                <LazyLoad
                    offset={150}
                >
                    <SitecoreImage {...otherProps} field={field} />
                </LazyLoad>
            );
        } else {
        return(
                <SitecoreImage {...otherProps} field={field} />
        );

        }


    }
}

export default Image;