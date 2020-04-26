import React,{Component} from 'react';
import zenScroll from 'zenscroll';
import Image from '../image';
import RouterLink from '../routerLink';


class HeaderLogo extends Component {
    render() {
        return (
            <div
                data-metrics-event-name="72.3"
                data-metrics-subsection="Home"
                data-metrics-container="Global Nav"
                data-metrics-nav_category="Lexus Drivers"
                data-metrics-nav_subcategory="Lexus Drivers Logo"
            >
                <RouterLink
                    className="navbar-brand"
                    jss={{
                        value: {
                            href: '/lexusdrivers'
                        }
                    }}
                    onClick={() => {
                        if (window.location.href.endsWith('/lexusdrivers')) {
                            zenScroll.toY(0, 500);
                        }
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