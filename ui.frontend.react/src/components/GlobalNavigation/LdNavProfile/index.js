import { Text } from '@sitecore-jss/sitecore-jss-react';
import classnames from 'classnames';
import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, NavItem, NavLink } from 'reactstrap';
import RouterLink from '../components/routerLink';
import { routerLinkFormat, routerLabelFormat } from '../components/models';

class LdNavProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authProfile: [],
            isModalOpen: false,
            unauthProfile: []
        };
        this.notificationCount = 10;
    }

    componentDidMount() {
        if (this.props.NavigationLinks !== undefined) {

            this.setState({
                authProfile: this.props.LoggedIn.children,
                unauthProfile: this.props.LoggedOut,
            });
        }
    }

    componentDidUpdate(prevProps) {
        // change the param based on logged in context
        if (this.props.NavigationLinks !== prevProps.NavigationLinks) {
            this.setState({
                authProfile: this.props.LoggedIn.children,
                unauthProfile: this.props.LoggedOut,
            });
        }
    }
    toggleNotificationModal = () => {
        this.props.metrics.track('72.1', { error_message: '', module: 'Notifications', subsection: 'Global Nav ' });
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    onLinkClick = () => {
        if (this.props.onLinkClick) {
            this.props.onLinkClick();
        }
    }

    // tslint:disable-next-line: cognitive-complexity
    render() {
        const { unauthProfile, authProfile } = this.state;
        const isLoggedIn = this.props.isLoggedIn;
        const firstName = this.props.firstName !== undefined ? this.props.firstName : '';

        return (
            <>
                {isLoggedIn ?
                    <>
                        <NavItem className="ld-navright show-welExp ml-auto">
                            <NavLink
                                data-firetag="73.6"
                                data-firetag-param={`{"<container>": "Global Nav","<app>": "LD","<nav_category>":"Home","<nav_subcategory>":"Welcome Tool Tip Steps" }`}
                                href=""
                                className="text-hide show-welExp"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                Link
                            </NavLink>
                        </NavItem>

                        <Dropdown
                            nav={true}
                            inNavbar={true}
                            id="ld-navProfile"
                            className="ld-navright auth-dpd"
                            tag="div"
                            isOpen={this.props.dropdownOpen}
                            toggle={this.props.toggle}
                            onMouseEnter={this.props.onMouseEnter}
                            onMouseLeave={this.props.onMouseExit}
                            onClick={this.props.onClick}
                        >
                            <div
                                data-firetag="72.3"
                                data-firetag-param={`{"<container>": "Global Nav","<app>": "LD","<nav_category>":"Profile","<nav_subcategory>":"Profile" }`}
                            >
                                <DropdownToggle
                                    id="loginNav"
                                    nav={true}
                                    className="ld-caret auth-profile"
                                >
                                    <div className="userName">
                                        {firstName}
                                        {this.notificationCount > 0 &&
                                            <span className="notificationNum">{this.notificationCount}</span>
                                        }
                                    </div>
                                </DropdownToggle>
                            </div>
                            <DropdownMenu right={true} className="ld-submenu auth-sumenu profile-menu" tag="ul">
                                {this.notificationCount > 0 &&
                                    <li>
                                        <a
                                            className="notificationLink"
                                            onClick={(e) => {
                                                this.toggleNotificationModal();
                                            }}
                                            data-firetag="72.3"
                                            data-firetag-param={`{"<container>": "Global Nav","<app>": "LD","<nav_category>":"Profile","<nav_subcategory>":"Notifications" }`}
                                        >
                                            Notifications ({this.notificationCount})
                                    </a>
                                    </li>
                                }
                                {authProfile &&
                                    Object.keys(authProfile).map((i) => {
                                        const showExpCheck = authProfile[i].enableExperience.value === '1';
                                        const deviceClass = authProfile[i].deviceStyles.value;
                                        const routerProps = {
                                            className: showExpCheck ? 'show-welExp' : '',
                                            onClick: this.onLinkClick
                                        };
                                        if (authProfile[i].navLink.value !== '') {
                                            routerProps['field'] = authProfile[i].navLink;
                                        }
                                        return (
                                            <li
                                                key={i}
                                                className={classnames({ 'hide-show-welExp': showExpCheck }, { [`${deviceClass}`]: true })}
                                            >
                                                <div
                                                    data-firetag="72.3"
                                                    data-firetag-param={`{"<container>": "Global Nav","<app>": "LD","<nav_category>":"Profile","<nav_subcategory>":"${authProfile[i].navLabel.jss.value}" }`}
                                                >
                                                    <RouterLink {...routerProps}>
                                                        <Text field={authProfile[i].navLabel} />
                                                    </RouterLink>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </DropdownMenu>
                        </Dropdown>
                    </>
                    :
                    <Dropdown
                        nav={true}
                        inNavbar={true}
                        id="ld-navProfile"
                        className="ld-navright unauth-dpd"
                        tag="div"
                        isOpen={this.props.dropdownOpen}
                        toggle={this.props.toggle}
                        onMouseEnter={this.props.onMouseEnter}
                        onMouseLeave={this.props.onMouseExit}
                        onClick={this.props.onClick}
                    >
                        <DropdownToggle nav={true} id="logoutLogo" />

                        <DropdownMenu right={true} className="ld-submenu unauth-sumenu profile-menu">
                            {unauthProfile &&
                                Object.keys(unauthProfile).map((i) => (
                                    <React.Fragment key={i}>
                                        {unauthProfile[i].navLabel &&
                                            <span
                                                data-firetag="72.3"
                                                data-firetag-param={`{"<container>": "Global Nav","<app>": "LD","<nav_category>":"Profile","<nav_subcategory>":"Profile","<module>":"Account Module","<action>":"${unauthProfile[i].navLabel}" }`}
                                            >
                                                <RouterLink
                                                    // THESE NEED TO BE RECONFIGURED FOR MOBILE VS DESKTOP
                                                    key={i + unauthProfile[i].navLabel}
                                                    button_text={unauthProfile[i].navLabel}
                                                    className={Number(i) % 2 === 0 ? 'btn btn-white' : 'btn btn-black'}
                                                    field={routerLinkFormat(unauthProfile[i])}
                                                    onClick={this.onLinkClick}
                                                >
                                                    <Text field={routerLabelFormat(unauthProfile[i].navLabel)} />
                                                </RouterLink>
                                            </span>
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </DropdownMenu>
                    </Dropdown>
                }
            </>
        );
    }
}

export default LdNavProfile;
