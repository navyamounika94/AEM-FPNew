import { Text } from '@sitecore-jss/sitecore-jss-react';
import classnames from 'classnames';
import React, {Component} from 'react';
import { Card, CardBody, CardImg, CardSubtitle, Dropdown, DropdownMenu, DropdownToggle, ListGroup, ListGroupItem, Nav } from 'reactstrap';
import Image from '../components/image';
import RouterLink from '../components/routerLink';
import { Viewport } from '../components/Viewport';
import ImageSlider from '../ImageSlider';
import selectedVehicleJson from '../json/SelectedVehicle.json';

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
            const modelParam = { value : ''};
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
                navlist: this.props.NavigationLinks.children,
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.NavigationLinks !== prevProps.NavigationLinks) {

            this.setState({
                navlist: this.props.NavigationLinks.children,
            });
        }
    }

    // TODO: Revisit this component
    // tslint:disable-next-line
    render() {
        const { navlist } = this.state;
        const isTablet = this.viewport === Viewport.TABLET;
        const isMobile = this.viewport === Viewport.MOBILE;

        return (

            <Nav className={classnames({ 'ld-megamenu': true, 'mr-auto': true, 'menuDiv': isTablet })} navbar={true} id="check">

                {navlist &&
                    // tslint:disable-next-line: no-big-function
                    Object.keys(navlist).map((key, index) => {
                        return (
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
                                    data-metrics-nav_subcategory="Home"
                                    data-metrics-nav_category={navlist[index].navLabel.jss.value}
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
                                    {navlist[index].navLabel.jss.value}
                                </DropdownToggle>

                                <DropdownMenu right={true} className="ld-submenu">
                                    <div className="row">
                                        {navlist[index].children &&
                                            Object.keys(navlist[index].children).map((j, indexNav) => {
                                                const menu = navlist[index];
                                                const subMenu = navlist[index].children[j];

                                                return (
                                                    <div
                                                        className={classnames({
                                                            'col-12': true,
                                                            'col-lg-4': !isTablet,
                                                            'col-panel ': true,
                                                            'col-sm-6': isTablet,
                                                            'col-sm-8': isTablet && menu.children.length - 1 === indexNav,
                                                            'imgNavCenterTabletView': isTablet && menu.children.length - 1 === indexNav,
                                                        })}
                                                        key={j}
                                                    >

                                                        {subMenu.navLabel ?
                                                            <>
                                                                <h4>{subMenu.navLabel.value}</h4>
                                                                <hr className="ld-hrule" />
                                                                <ListGroup
                                                                    className={`d-flex flex-row flex-wrap ${menu.navLabel.jss.value.toUpperCase() === 'BENEFITS' ? 'multiColList' : ''}`}
                                                                >
                                                                    {subMenu.children &&
                                                                        Object.keys(subMenu.children).map((k) => {
                                                                            return (
                                                                                <ListGroupItem key={k}>
                                                                                    <span
                                                                                        data-metrics-event-name="72.3"
                                                                                        data-metrics-container="Global Nav"
                                                                                        data-metrics-nav_category={menu.navLabel.jss.value}
                                                                                        data-metrics-nav_subcategory={subMenu.navLabel.jss.value + ':' + subMenu.children[k].navLabel.value}
                                                                                    >
                                                                                        <RouterLink
                                                                                            field={subMenu.children[k].navLink}
                                                                                            onClick={() => this.props.onLinkClick}
                                                                                        >
                                                                                            <Text field={subMenu.children[k].navLabel} />
                                                                                            <Image
                                                                                                className="navlink-icon"
                                                                                                lazyLoad={false}
                                                                                                field={subMenu.children[k].navIcon.jss}
                                                                                            />
                                                                                        </RouterLink>
                                                                                    </span>
                                                                                </ListGroupItem>
                                                                            );
                                                                        })
                                                                    }
                                                                </ListGroup>

                                                                <div className="d-flex flex-row flex-wrap link-btm">
                                                                    <RouterLink
                                                                        field={subMenu.link}
                                                                        tag_id="72.3"
                                                                        container="Global Nav"
                                                                        nav_category={subMenu.navLabel.value}
                                                                        nav_subcategory={subMenu.navLabel.value + ':' + subMenu.label.value}
                                                                        onClick={() => {
                                                                            this.props.onLinkClick();
                                                                        }}
                                                                    >
                                                                        <Text field={subMenu.navLabel} />
                                                                    </RouterLink>
                                                                </div>
                                                            </>
                                                            :
                                                            <>

                                                                <div className="col imagecolumn">
                                                                    {
                                                                        // Here, the check for 'isOpen' is to avoid loading images that will not be seen
                                                                        (subMenu.children.length > 1 && this.props.isOpen) ?
                                                                            <ImageSlider
                                                                                settings={this.settings}
                                                                                sliderContent={subMenu.children}
                                                                                category={menu.navLabel.jss.value}
                                                                                id={`navSlider${index}`}
                                                                            />
                                                                            :
                                                                            <div>
                                                                                <Card className="ld-tile">
                                                                                    <RouterLink
                                                                                        field={subMenu.children[0].linkoutUrl}
                                                                                        tag_id="72.3"
                                                                                        container="Global Nav"
                                                                                        nav_category={menu.navLabel.jss.value}
                                                                                        nav_subcategory={subMenu.children[0].title.jss.value}
                                                                                        onClick={() => {
                                                                                            this.props.onLinkClick();
                                                                                        }}
                                                                                    >
                                                                                        <div className="img-wrapper">
                                                                                            {this.props.isOpen &&
                                                                                                <CardImg
                                                                                                    top={true}
                                                                                                    src={subMenu.children[0].thumbnail.jss.value.src}
                                                                                                    alt="Card image cap"
                                                                                                />
                                                                                            }
                                                                                        </div>
                                                                                    </RouterLink>

                                                                                    <CardBody>
                                                                                        {this.props.isOpen &&
                                                                                            <RouterLink
                                                                                                field={subMenu.children[0].linkoutUrl}
                                                                                                nav_category={subMenu.children[0].title.jss.value}
                                                                                                nav_subcategory={
                                                                                                    menu.navLabel.jss.value + ':' + menu.navLabel.jss.value
                                                                                                }
                                                                                                onClick={() => {
                                                                                                    this.props.onLinkClick();
                                                                                                }}
                                                                                            >
                                                                                                <CardSubtitle>{subMenu.children[0].title.jss.value}</CardSubtitle>
                                                                                            </RouterLink>
                                                                                        }
                                                                                    </CardBody>
                                                                                </Card>

                                                                            </div>
                                                                    }
                                                                </div>
                                                            </>
                                                        }
                                                    </div>

                                                );
                                            }

                                            )}
                                    </div>
                                </DropdownMenu>
                            </Dropdown>
                        );
                    })
                }
            </Nav>
        );
    }
}

export default LdNavCenter;