import { Text } from '@sitecore-jss/sitecore-jss-react';
import classnames from 'classnames';
import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardSubtitle, Dropdown, DropdownMenu, DropdownToggle, ListGroup, ListGroupItem, Nav } from 'reactstrap';
import Image from '../components/image';
import RouterLink from '../components/routerLink';
import { Viewport } from '../components/Viewport';
import selectedVehicleJson from '../json/SelectedVehicle.json';
import { routerLinkFormat, routerLabelFormat, imageJSSFormat } from '../components/models';

class LdNavCenter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            navlist: [],
            showItems: []
        };

        this.settings = {
            centerMode: false,
            dots: true,
            infinite: false,
            slidesToScroll: 1,
            slidesToShow: 1,
            speed: 500,
        };
        this.selectedGarageVehicle = selectedVehicleJson;
        this.viewport = 'DESKTOP';
    }

    toggle = (num) => {
        const tempArr = this.state.showItems;
        tempArr[num] = !tempArr[num];

        this.setState({
            showItems: tempArr
        });

        this.forceUpdate();
    }

    /**
     * Given a model,year string, convert it to the proper Accessories website format.
     *
     * Example: '2019','CT200H' => '2019_CT-200h'
     *          '2013','GS F' => '2013_GS-F'
     *          '2018','LFA' => '2018_LFA'
     *          '2020','RX-250hL' => 2020_RX_250h-L
     */
    accessoriesRedirect = (element) => {
        if (this.selectedGarageVehicle !== null) {
            const regex = /(?=\d)/g;
            const model = this.selectedGarageVehicle.model;
            const year = this.selectedGarageVehicle.year;
            const modelFormat = model.split(regex);
            const modelParam = { value: '' };
            if (modelFormat.length > 1) {
                modelParam.value = year + '_' + modelFormat.shift() + '-' + modelFormat.join('').toLowerCase(); // 2019_CT-200h
                modelParam.value = modelParam.value.endsWith('hl') ? modelParam.value.replace('hl', 'h-L') : modelParam.value; // 2020_RX_250h-L
            } else {
                const modelName = modelFormat[0].split(' ');
                modelParam.value = year + '_' + modelName[0] + (modelName[1] ? '-' + modelName[1] : ''); // 2019_GS-F,2019_LFA
            }
            const curHref = element.getAttribute('href');
            if (curHref != null) {
                const redirectURL = curHref.replace('.html', '_' + modelParam.value + '.html');
                window.open(redirectURL, '_blank');
            }
        }
    }

    componentDidMount() {
        if (this.props.NavigationLinks !== undefined) {

            this.setState({
                navlist: this.props.NavigationLinks,
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.NavigationLinks !== prevProps.NavigationLinks) {

            this.setState({
                navlist: this.props.NavigationLinks,
            });
        }
    }

    // TODO: Revisit this component
    // tslint:disable-next-line
    render() {
        const { navlist } = this.state;
        const isTablet = this.props.viewport === Viewport.TABLET;
        const isMobile = this.props.viewport === Viewport.MOBILE;

        return (

            <Nav className={classnames({ 'ld-megamenu': true, 'mr-auto': true, 'menuDiv': isTablet })} navbar={true} id="check">

                {navlist &&
                    // tslint:disable-next-line: no-big-function
                    Object.keys(navlist).map((key, index) => {
                        return (
                            <React.Fragment key={key}>
                                {navlist[index].label &&
                                    <Dropdown
                                        nav={true}
                                        inNavbar={true}
                                        key={index}
                                        toggle={() => {
                                            // For desktop, we use this toggle function instead of the DropdownToggle onClick, to support onHover effects
                                            if (this.props.toggle && (this.viewport === Viewport.DESKTOP || this.viewport === Viewport.EXTRA_LARGE)) {
                                                this.props.toggle(index + 1);
                                            }
                                        }}
                                        className="nav-dpd"
                                        isOpen={this.props.isOpen && this.props.openIndex === index + 1}
                                        onMouseOver={() => {
                                            if (this.props.onMouseOver && !(isMobile || isTablet)) {
                                                this.props.onMouseOver(index + 1);
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            if (this.props.onMouseLeave && !(isMobile || isTablet)) {
                                                this.props.onMouseLeave(index + 1);
                                            }
                                        }}
                                    >

                                        <DropdownToggle
                                            nav={true}
                                            className="ld-caret nav-centerItem"
                                            id={`nav-bar-tab-${index + 1}`}
                                            data-firetag="72.3"
                                            data-firetag-param={`{"<container>": "Global Nav","<app>": "LD-AEM","<nav_category>":"${navlist[index].label}","<nav_subcategory>":"Home" }`}
                                            onClick={() => {
                                                // For mobile and tablet, we only toggle on clicks
                                                if (this.props.toggle && (this.viewport === Viewport.MOBILE || this.viewport === Viewport.TABLET)) {
                                                    this.props.toggle(index + 1);
                                                    const topElement =
                                                        this.viewport === Viewport.MOBILE ? document.querySelector('#nav-bar-selectVehicle-tab')
                                                            :
                                                            this.viewport === Viewport.TABLET ? document.querySelector('#nav-bar-tab-1')
                                                                :
                                                                null
                                                        ;

                                                    if (topElement != null) {
                                                        topElement.scrollIntoView();
                                                    }
                                                }
                                            }}
                                        >
                                            {navlist[index].label}
                                        </DropdownToggle>

                                        <DropdownMenu right={true} className="ld-submenu">
                                            <div className="row">
                                                {navlist[index].children &&
                                                    Object.keys(Object.values(navlist[index].children)).map((j, indexNav) => {
                                                        const menu = navlist[index];
                                                        const subMenu = Object.values(navlist[index].children)[j];
                                                        return (
                                                            <React.Fragment key={indexNav}>
                                                                {subMenu.navlabel &&
                                                                    <div
                                                                        className={classnames({
                                                                            'col-12': true,
                                                                            'col-lg-4': !isTablet,
                                                                            'col-panel ': true,
                                                                            'col-sm-6': isTablet
                                                                        })}
                                                                        key={j + subMenu.navlabel}
                                                                    >

                                                                        <h4>{subMenu.navlabel}</h4>
                                                                        <hr className="ld-hrule" />
                                                                        <ListGroup
                                                                            className={`d-flex flex-row flex-wrap ${menu.label.toUpperCase() === 'BENEFITS' ? 'multiColList' : ''}`}
                                                                        >
                                                                            {subMenu.children &&
                                                                                Object.keys(Object.values(subMenu.children)).map((k) => {
                                                                                    const subMenuChildren = Object.values(subMenu.children);
                                                                                    return (
                                                                                        <React.Fragment key={k}>
                                                                                            {subMenuChildren[k].navLabel &&
                                                                                                <ListGroupItem key={k}>
                                                                                                    <span
                                                                                                        data-firetag="72.3"
                                                                                                        data-firetag-param={`{"<container>": "Global Nav","<app>": "LD-AEM","<nav_category>":"${menu.label}","<nav_subcategory>":"${subMenu.navlabel + ':' + subMenuChildren[k].navLabel}" }`}
                                                                                                    >
                                                                                                        <RouterLink
                                                                                                            field={routerLinkFormat(subMenuChildren[k])}
                                                                                                            onClick={() => this.props.onLinkClick}
                                                                                                        >
                                                                                                            <Text field={routerLabelFormat(subMenuChildren[k].navLabel)} />
                                                                                                            {subMenuChildren[k].navIcon &&
                                                                                                                <Image
                                                                                                                    className="navlink-icon"
                                                                                                                    lazyLoad={false}
                                                                                                                    field={imageJSSFormat(subMenuChildren[k].navIcon)}
                                                                                                                />
                                                                                                            }
                                                                                                        </RouterLink>
                                                                                                    </span>
                                                                                                </ListGroupItem>
                                                                                            }
                                                                                        </React.Fragment>
                                                                                    );
                                                                                })
                                                                            }
                                                                        </ListGroup>

                                                                        <div className="d-flex flex-row flex-wrap link-btm"
                                                                            data-firetag="72.3"
                                                                            data-firetag-param={`{"<container>": "Global Nav","<app>": "LD-AEM","<nav_category>":"${subMenu.navlabel}","<nav_subcategory>":"${subMenu.navlabel + ':' + subMenu.navlabel}" }`}
                                                                        >
                                                                            <RouterLink
                                                                                field={routerLinkFormat(subMenu)}
                                                                                tag_id="72.3"
                                                                                container="Global Nav"
                                                                                nav_category={subMenu.navlabel}
                                                                                nav_subcategory={subMenu.navlabel + ':' + subMenu.navlabel}
                                                                                onClick={() => {
                                                                                    this.props.onLinkClick();
                                                                                }}
                                                                            >
                                                                                <Text field={routerLabelFormat(subMenu.navlabel)} />
                                                                            </RouterLink>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                {Object.values(menu.children).length - 1 === indexNav &&
                                                                    <div
                                                                        className={classnames({
                                                                            'col-12': true,
                                                                            'col-lg-4': !isTablet,
                                                                            'col-panel ': true,
                                                                            'col-sm-6': isTablet,
                                                                            'col-sm-8': isTablet,
                                                                            'imgNavCenterTabletView': isTablet,
                                                                        })}
                                                                        key={j}
                                                                    >

                                                                        <div className="col imagecolumn">
                                                                            {this.props.isOpen &&
                                                                                // Here, the check for 'isOpen' is to avoid loading images that will not be seen
                                                                                <div>
                                                                                    <Card className="ld-tile">
                                                                                        <RouterLink
                                                                                            field={routerLinkFormat(menu)}
                                                                                            tag_id="72.3"
                                                                                            container="Global Nav"
                                                                                            nav_category={menu.label}
                                                                                            nav_subcategory={menu.carouselTitle}
                                                                                            onClick={() => {
                                                                                                this.props.onLinkClick();
                                                                                            }}
                                                                                        >
                                                                                            <div className="img-wrapper">
                                                                                                {this.props.isOpen &&
                                                                                                    <CardImg
                                                                                                        top={true}
                                                                                                        src={menu.thumbnail}
                                                                                                        alt="Card image cap"
                                                                                                    />
                                                                                                }
                                                                                            </div>
                                                                                        </RouterLink>

                                                                                        <CardBody>
                                                                                            {this.props.isOpen &&
                                                                                                <RouterLink
                                                                                                    field={routerLinkFormat(menu)}
                                                                                                    nav_category={menu.carouselTitle}
                                                                                                    nav_subcategory={
                                                                                                        menu.label + ':' + menu.label
                                                                                                    }
                                                                                                    onClick={() => {
                                                                                                        this.props.onLinkClick();
                                                                                                    }}
                                                                                                >
                                                                                                    <CardSubtitle>{menu.carouselTitle}</CardSubtitle>
                                                                                                </RouterLink>
                                                                                            }
                                                                                        </CardBody>
                                                                                    </Card>

                                                                                </div>
                                                                            }
                                                                        </div>

                                                                    </div>
                                                                }
                                                            </React.Fragment>
                                                        );
                                                    }

                                                    )}
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                }
                            </React.Fragment>
                        );
                    })
                }
            </Nav>
        );
    }
}

export default LdNavCenter;