import React, { Component } from 'react';
import zenScroll from 'zenscroll';
import Image from '../image';
import RouterLink from '../routerLink';
import { getViewport } from '../Viewport/index';

class HeaderLogo extends Component {
    render() {
        return (
            <div
                data-firetag="72.3"
                data-firetag-param={`{"<container>": "Global Nav","<app>": "LD","<nav_category>":"Lexus Drivers","<nav_subcategory>":"Lexus Drivers Logo", "<break_point>":"${getViewport()}" }`}
            >
                <RouterLink
                    className="navbar-brand"
                    jss={{
                        value: {
                            href: '/lexusdrivers'
                        }
                    }}
                    onClick={() => {
                        setTimeout(() => {
                            window.location.reload(false);
                        }, 0);
                    }}
                >
                    <Image
                        id="brandLogo"
                        field={this.props.field}
                    />
                </RouterLink>
            </div>
        );
    }
}

export default HeaderLogo;