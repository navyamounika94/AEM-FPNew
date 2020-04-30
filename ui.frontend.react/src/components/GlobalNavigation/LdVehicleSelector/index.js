import { Text } from '@sitecore-jss/sitecore-jss-react';
import classnames from 'classnames';
import isEmpty from 'lodash.isempty';
import sortBy from 'lodash.sortby';
import toPairs from 'lodash.topairs';
import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, Form, FormGroup, Input, ListGroup, ListGroupItem } from 'reactstrap';
import ModelYearJson from '../json/ModelYearJson.json';
import Image from '../components/image';
import { modelFormat, modelStrip } from '../components/models';
import { getVehicleFromCookiesLoggedout, setSelectedVehicle, replaceNewLine } from '../components/Viewport/index';
import PageLoader from '../components/PageLoader';
import RichText from '../components/RichText';
import RouterLink from '../components/routerLink';
import { Viewport } from '../components/Viewport';
import ImageSlider from '../ImageSlider';
import Garage from './Garage';
import { routerLinkFormat, richTextValueFormat, imageSliderFormat } from '../components/models';
const defaultVehicleLabel = 'Select a Vehicle';
const defaultModelLabel = 'SELECT A VEHICLE';
const defaultYearLabel = 'SELECT A YEAR';


function clearCookie(name) {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() - 1);
    const extString = '; expires=' + exdate.toUTCString();
    const domainString = ';domain=.lexus.com;path=/';
    const cookieValue = '' + extString + domainString;
    document.cookie = name + '=' + cookieValue;
}

class LdVehicleSelector extends Component {

    constructor(props) {
        super(props);

        this.isLoggedIn = false;
        this.selectedGarageVehicle = null;
        this.viewport = 'DESKTOP';

        this.state = {
            isDefaultView: false,
            isLoggedIn: this.isLoggedIn,
            isModelSelected: false,
            isVehicleDetailsLoading: false,
            isVehicleLoadingError: false,
            modelYearData: {},
            modelYearDataAPI: {},
            moduleLabel: defaultVehicleLabel,
            selectedModel: defaultModelLabel,
            selectedYear: defaultYearLabel,
        };

        this.settings = {
            centerMode: false,
            dots: true,
            infinite: true,
            lazyLoad: 'ondemand',
            slidesToScroll: 1,
            slidesToShow: 1,
            speed: 500,
            variableWidth: true,
        };
    }
    getModelYearDataAPI = () => {
        var myHeaders = new Headers();
        myHeaders.append("Access-Control-Request-Method", "GET");
        myHeaders.append("x-api-key", "CIzm7ytLco5j7FINAtTGm1xAqDODwrVd8zHhtXZ1");
        myHeaders.append("X-BRAND", "L");
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Accept', 'application/json');
        fetch("https://region1.test.eos.toyota.com/v1/vehicle/model-year-list?format=model-year", {
            headers: myHeaders
        }).then((response) => {
            return response.json();
        }).then((json) => {
            const modelYearDataAPI = json;
            this.setState({
                modelYearDataAPI
            });
        });
    }
    getModelYearData = () => {
        const dataLoaded = (!isEmpty(this.state.modelYearDataAPI));
        if (dataLoaded) {
            return this.state.modelYearDataAPI.data.vehicleModelYearList;
        } else {
            return ModelYearJson.vehicleModelYearList;
        }
    }

    /**
     * Given a model, return the list of years that correlate to that model
     */
    getYearListForModel = (selectedModel) => {
        const modelYearData = this.getModelYearData();

        // Run model-strip on all keys modelYearData and on the selected Model, just
        // in case the model string from the <option> tag differs from the model string in the DCS service response.
        const formattedModelYearData = {};
        for (const model of Object.keys(modelYearData)) {
            const yearList = modelYearData[model];
            formattedModelYearData[modelStrip(model)] = yearList;
        }

        return formattedModelYearData[modelStrip(selectedModel)];
    }

    /**
     * Given a model, return true/false depends on whether model exists in data.
     */
    validateModelWithData = (selectedModel) => {
        const modelYearData = this.getModelYearData();
        const model = modelStrip(selectedModel).replace(/^([A-Z][A-Z])F/, '$1 F');
        return model in modelYearData;
    }

    /**
     * Reset component state based on the currently selected Vehicle
     */
    loadSelectedVehicle = () => {
        if (!!this.selectedGarageVehicle && this.validateModelWithData(this.selectedGarageVehicle.model)) {
            const model = this.selectedGarageVehicle.model;
            const year = this.selectedGarageVehicle.year;

            this.setState({
                isModelSelected: true,
                moduleLabel: year + ' ' + modelFormat(model),
                selectedModel: model,
                selectedYear: year,
                yearList: this.getYearListForModel(model),
            });
        } else { // No vehicle is selected
            const modelYearData = this.getModelYearData();
            this.setState({
                isModelSelected: false,
                modelYearData,
                moduleLabel: defaultVehicleLabel,
                selectedModel: defaultModelLabel,
                selectedYear: defaultYearLabel,
                yearList: undefined,
            });
        }
    }


    resetVehicleSelection = () => {
        if (this.isLoggedIn) {
            clearCookie('last-viewed-cars');
            clearCookie('ldng-logged-out-selected-vehicle');
        } else {
            clearCookie('ldng-logged-out-selected-vehicle');
        }

        this.setState({
            isDefaultView: true,
            isModelSelected: false,
            moduleLabel: defaultVehicleLabel,
            selectedModel: defaultModelLabel,
            selectedYear: defaultYearLabel,
        });
        this.selectedGarageVehicle = null;
    }

    handleModelChange = (e) => {
        this.props.onOptionClicked();

        const selectedModel = e.target.value;
        const yearList = this.getYearListForModel(selectedModel);

        this.setState({
            selectedModel,
            selectedYear: defaultYearLabel,
            yearList,
        });
    }

    handleYearChange = (e) => {
        const selectedYear = e.target.value;
        this.props.onOptionClicked();
        this.setState({
            isDefaultView: (this.state.selectedModel === defaultModelLabel && this.state.selectedYear === defaultYearLabel),
            selectedYear,
        });
    }

    handleVehicleSelection = (e) => {
        e.preventDefault();
        this.props.onVehicleSelected();

        if (this.state.selectedModel.toLowerCase() !== defaultModelLabel.toLowerCase() && this.state.selectedYear.toLowerCase() !== defaultYearLabel.toLowerCase()) {
            this.setState({
                moduleLabel: this.state.selectedYear + ' ' + this.state.selectedModel,
                isModelSelected: true
            });
            this.selectedGarageVehicle  = {
                description: '',
                isSelected: true,
                make: 'Lexus',
                model: this.state.selectedModel,
                modelCode: '9900',
                nickname: '',
                vehicleId: 0,
                vehicleOfInterestId: 0,
                vin: '',
                year: this.state.selectedYear,
                yearMakeModel: `${this.state.selectedYear}  ${this.state.selectedModel}`,
            };
            setSelectedVehicle(this.selectedGarageVehicle);
        }
    }


    ModelSelectionDropdown = (props) => {
        return (
            <FormGroup className="col-12 select-model">
                <Input
                    type="select"
                    name="select"
                    id="m-selector"
                    onChange={props.handleChange}
                    value={modelStrip(props.selectedModel)}
                    onClick={() => { this.props.onOptionClicked(); }}
                    onMouseDown={() => { this.props.onOptionClicked(); }}
                >
                    {(props.selectedModel === defaultModelLabel) && <option>{modelFormat(props.selectedModel)}</option>}
                    {
                        sortBy(toPairs(props.modelYearData), 0).map((entries) => {
                            const model = entries[0];
                            return (
                                <option
                                    key={modelStrip(model)}
                                    value={modelStrip(model)}
                                >
                                    {modelFormat(model)}
                                </option>
                            );
                        })
                    }
                </Input>
            </FormGroup>
        );
    }

    YearSelectionDropdown = (props) => {
        let yearList;
        { props.yearList ? yearList = props.yearList : yearList = props.modelYearData[props.selectedModel]; }
        let yearOptions = [];
        if (yearList) {
            yearList.sort((a, b) => {
                return parseInt(b, 10) - parseInt(a, 10);
            });

            yearOptions = yearList.map((year, i) => (
                <option
                    key={i}
                    value={year}
                >
                    {year}
                </option>
            ));
        }


        return (
            <FormGroup className="col-12 select-year">
                <Input
                    type="select"
                    name="select"
                    id="yr-selector"
                    onChange={props.handleChange}
                    value={props.selectedYear}
                    onClick={() => { this.props.onOptionClicked(); }}
                    onMouseDown={() => { this.props.onOptionClicked(); }}
                >
                    {(props.selectedYear === defaultYearLabel || yearList === undefined) ? <option>{props.selectedYear}</option> : null}
                    {yearOptions}
                </Input>
            </FormGroup>
        );
    }

    /**
     * Shown to the right of the model-year selector in logged-out view.
     * When there is no vehicle selected
     */
    VehicleCopy = (props) => {
        return (
            <div className={`col-12 col-sm-6 col-md-4 col-panel defaultView`}>
                <h4> <Text field={richTextValueFormat(props.title)} /></h4>
                <div className="d-flex flex-row flex-wrap">
                    <RichText field={richTextValueFormat(props.body)} sitecoreContext='normal'/>
                </div>
            </div>
        );
    }

    /**
     * Shown to the right of the model-year selector in logged-out view.
     * When there is a vehicle selected
     */
    QuickLinksSection = (props) => {
        return (
            <div className={`col-12 col-sm-6 col-md-4 col-panel`}>
                <h4>
                    {props.vehicleLabel} <Text field={richTextValueFormat(props.QuickLinks.quicknavLabel)} />
                </h4>

                <hr className="ld-hrule" />

                <ListGroup className="d-flex flex-row flex-wrap">
                    {props.QuickLinks.quicklinks &&
                        Object.values(props.QuickLinks.quicklinks).map((child, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {child.navLabel &&
                                        <ListGroupItem key={index}>
                                            <div
                                                data-firetag="72.3"
                                                data-firetag-param={`{"<container>": "Global Nav","<app>": "LD-AEM","<nav_category>":"Vehicle Module","<nav_subcategory>":"${child.name}" }`}
                                            >
                                                <RouterLink
                                                    field={routerLinkFormat(child)}
                                                >
                                                    <Text field={richTextValueFormat(child.navLabel)} />
                                                    {child.navIcon &&
                                                        <Image className="navlink-icon" lazyLoad={false} field={child.navIcon} />
                                                    }
                                                </RouterLink>
                                            </div>
                                        </ListGroupItem>
                                    }
                                </React.Fragment>
                            );
                        })
                    }
                </ListGroup>
            </div>
        );
    }

    componentDidMount() {
        console.log(getVehicleFromCookiesLoggedout());
        this.selectedGarageVehicle = getVehicleFromCookiesLoggedout();
        this.getModelYearDataAPI();
        const modelYearData = this.getModelYearData();
        this.setState({
            isDefaultView: this.state.isModelSelected,
            modelYearData,
        });

        this.loadSelectedVehicle();
    }

    componentDidUpdate(prevProps) {
        if (this.selectedGarageVehicle !== prevProps.selectedGarageVehicle) {
            //this.loadSelectedVehicle();
        }
    }

    // tslint:disable-next-line
    render() {
        if (!this.props.SelectVehicle) {
            return null;
        }

        const modelYearData = this.getModelYearData();

        const navigationDatasource = this.props.SelectVehicle;

        let GarageContent;
        GarageContent = (
            <Garage
                onVehicleSelected={this.props.onVehicleSelected}
            />
        );

        const { yearList, selectedYear, selectedModel, moduleLabel, isLoggedIn, isVehicleDetailsLoading, isModelSelected } = this.state;
        const vinLabel = this.props.SelectVehicle.vINLabel;
        const vin = this.selectedGarageVehicle && this.selectedGarageVehicle.vin ? this.selectedGarageVehicle.vin : '';
        const showClearLink =
            (!this.isLoggedIn && this.selectedGarageVehicle !== null) ||
            (this.isLoggedIn && this.selectedGarageVehicle !== null);

        return (
            <Dropdown
                nav={true}
                inNavbar={(this.props.viewport !== Viewport.MOBILE)}
                tag="div"
                className={classnames({
                    'garage-auth': isLoggedIn,
                    'vehicle-dpd': true
                })}
                isOpen={this.props.isOpen}
                toggle={this.props.toggle}
                onMouseOver={() => {
                    if (this.props.onMouseOver) {
                        this.props.onMouseOver();
                    }
                }}
                onMouseLeave={this.props.onMouseLeave}
            >

                {navigationDatasource.navLabel && <>
                    <DropdownToggle
                        nav={true}
                        className={classnames({
                            'ld-caret': true,
                            'selectVehicle-nav': isLoggedIn,
                            'selectVehicle-nav-unauth': !isLoggedIn
                        })}
                        id="nav-bar-selectVehicle-tab"
                        data-firetag="72.3"
                        data-firetag-param={`{"<container>": "Global Nav","<app>": "LD-AEM","<nav_category>":"My Vehicle","<nav_subcategory>":"My Vehicle" }`}
                        onClick={(e) => { e.preventDefault(); }}
                    >
                        {this.props.viewport === Viewport.MOBILE ?
                            <div className="text-hide closePanel">Before</div>
                            : null
                        }
                        {moduleLabel}

                        {(this.props.viewport === Viewport.MOBILE && isLoggedIn && this.selectedGarageVehicle && this.selectedGarageVehicle.vin) &&
                            <div className="displayVin">
                                <Text field={vinLabel} />
                                {vin}
                            </div>
                        }
                        {this.props.viewport === Viewport.MOBILE ?
                            <div className="text-hide closeMenu" onClick={this.props.toggleNav}>after</div>
                            : null
                        }
                    </DropdownToggle>

                    <DropdownMenu className="ld-submenu">
                        {navigationDatasource.navLabel &&
                            <div className="row veh-selector">
                                {this.props.viewport === Viewport.MOBILE && isLoggedIn &&
                                    <div
                                        className={classnames({
                                            'col-12': true,
                                            'col-panel': true,
                                            'col-sm-6': true
                                        })}
                                    >
                                        {
                                            isVehicleDetailsLoading ?
                                                <PageLoader />
                                                :
                                                <div>
                                                    {GarageContent}
                                                </div>
                                        }
                                    </div>
                                }
                                <div
                                    className={classnames({
                                        'col-12': true,
                                        'col-lg-4': true,
                                        'col-panel': true,
                                        'col-sm-6': true,
                                        'select-vehicle-div': true
                                    })}
                                >
                                    <p className="col veh-copy">{this.props.SelectVehicle.titleSelection}</p>
                                    <Form>
                                        <div className="row">
                                            <div className="col-12 vehiclepanel">
                                                {showClearLink &&
                                                    <div className="clearLink">
                                                        <a onClick={this.resetVehicleSelection}>
                                                            {this.props.SelectVehicle.subTitle}
                                                        </a>
                                                    </div>
                                                }
                                                <this.ModelSelectionDropdown
                                                    selectedModel={selectedModel}
                                                    modelYearData={modelYearData}
                                                    handleChange={this.handleModelChange}
                                                    isDefaultView={this.state.isDefaultView}
                                                />

                                                <this.YearSelectionDropdown
                                                    selectedYear={selectedYear}
                                                    selectedModel={selectedModel}
                                                    yearList={yearList}
                                                    modelYearData={modelYearData}
                                                    handleChange={this.handleYearChange}
                                                    isDefaultView={this.state.isDefaultView}
                                                />

                                                <FormGroup className="col-12 veh-submit-div">
                                                    <input
                                                        type="button"
                                                        className="btn-black btn-block veh-submit"
                                                        onClick={this.handleVehicleSelection}
                                                        value={this.props.SelectVehicle.buttonLabel}
                                                        data-firetag="73.2"
                                                        data-firetag-param={`{"<container>": "Global Nav","<app>": "LD-AEM","<action>":"submit","<module>":"Vehicle Module" }`}
                                                    />
                                                </FormGroup>
                                                <div
                                                    data-firetag="73.2"
                                                    data-firetag-param={`{"<container>": "Global Nav",,"<app>": "LD-AEM","<action>":"${this.props.SelectVehicle.bottomText}","<module>":"Vehicle Module" }`}
                                                >
                                                    {(!isLoggedIn && this.state.isModelSelected) &&
                                                        <RichText
                                                            className="veh-caption"
                                                            field={richTextValueFormat(this.props.SelectVehicle.bottomText)}
                                                            sitecoreContext='normal'
                                                            data-metrics-event-name="73.2"
                                                        />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </div>

                                {isLoggedIn ?
                                    <> {this.props.viewport !== Viewport.MOBILE &&
                                        <div
                                            className={classnames({
                                                'col-12': true,
                                                'col-lg-8': true,
                                                'col-panel': true,
                                                'col-sm-6': true
                                            })}
                                        >
                                            {
                                                isVehicleDetailsLoading ?
                                                    <PageLoader />
                                                    :
                                                    <div> {GarageContent} </div>
                                            }
                                        </div>
                                    } </>
                                    :
                                    <>
                                        {isModelSelected ?
                                            <this.QuickLinksSection
                                                isModelSelected={this.state.isModelSelected}
                                                QuickLinks={this.props.SelectVehicle}
                                                vehicleLabel={this.state.moduleLabel}
                                            />
                                            :
                                            <this.VehicleCopy
                                                isModelSelected={this.state.isModelSelected}
                                                title={this.props.SelectVehicle.titleaccoutnt}
                                                body={this.props.SelectVehicle.body}
                                            />
                                        }
                                        <div className="col-12 col-md-4 col-panel un-authPanel">
                                            <div className="col imagecolumn">
                                                {!!this.props.SelectVehicle.selectcarouselTitle && this.props.isOpen &&
                                                    <ImageSlider
                                                        settings={this.settings}
                                                        sliderContent={imageSliderFormat(this.props.SelectVehicle)}
                                                        category="Vehicle Module"
                                                        id="vehnavSlider"
                                                    />
                                                }
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        }
                    </DropdownMenu>
                </>
                }
            </Dropdown>
        );
    }
}

export default LdVehicleSelector;