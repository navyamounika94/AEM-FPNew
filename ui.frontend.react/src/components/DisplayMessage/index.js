/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2018 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 $ npm install --save react-router-dom
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import React, { Component } from 'react';
import { MapTo } from '@adobe/cq-react-editable-components';
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { Link } from "react-router-dom";
import { getViewport } from '../GlobalNavigation/components/Viewport/index';
require('./DisplayMessage.css');

const displayMessageEditConfig = {

    emptyLabel: 'DisplayMessage',

    isEmpty: function (props) {
        return true;
    }
};

class DisplayMessage extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        displaydescription: "We sent password reset instructions to",//RichText
        displaydescription2: "If you didn't receive the email, please check your spam folder",
        displayprimaryButtonLink: "/lexusdrivers/account/login",
        displayprimaryButtonText: "OK",
        displaysupportContent: "RESEND PASSWORD RESET EMAIL",
        diplaytitle: "Success",
        displayverticalCenterAlign: true,
        name: "DisplayMessage"
    }
    componentDidMount() {
        try {
            window.fireTag("70.1",
                {
                    "<section>": "Home", "<subsection>": "Forgot Password Success", "page": "Forgot Password Success", "<tag_id>": "70.1",
                    "<break_point>": window.digitalData.page["<break_point>"], "<app>": window.digitalData.page["<app>"],
                    "<orientation>": window.digitalData.page["<orientation>"], "<login_status>": window.digitalData.page["<login_status>"], "<zip_code>": "", "<registration_type>": "", "<role>": ""

                }
            );
        }
        catch (err) {
            console.log(err, 'FireTag failed')
        }
    }
    render() {
        let boxClass = 'pg-box';
        if (this.props.displayverticalCenterAlign === false) {
            boxClass = '';
        }
        return (
            <div className={`row dispMsgWrapper ${boxClass}`} >
                <div className="col">
                    <Card className="text-center">
                        <CardBody>
                            {this.props.diplaytitle && <CardTitle>
                                {this.props.diplaytitle}
                            </CardTitle>}
                            {this.props.displaydescription && <CardText className="col-8 m-auto" tag="div">

                                {this.props.displaydescription.replace('{email}', this.props.email)}

                            </CardText>}
                            {this.props.displayprimaryButtonLink && this.props.displayprimaryButtonText &&
                                <CardText tag="h5">
                                    <a href={this.props.displayprimaryButtonLink} className="btn-black  btn btn-secondary" target=""
                                        data-firetag="73.6"
                                        data-firetag-param={`{"<subsection>": "Home","<tag_id>":"73.6","<page>": "Forgot Password Success", "<module>": "Forgot Password Success",
                                "<action>": "${this.props.displayprimaryButtonText}","<break_point>":"${getViewport()}"}`}>{this.props.displayprimaryButtonText}</a>
                                </CardText>
                            }
                            {this.props.displaysupportContent &&
                                <CardText tag="h5">
                                    <a className="rich-text-anchor active" aria-current="page" href="/lexusdrivers/account/forgot-password"> {this.props.displaysupportContent}</a>
                                </CardText>
                            }
                        </CardBody>
                    </Card>
                </div>
            </div>

        );

    }
}
export default MapTo('lexusdrivers/components/content/forgotPassword')(DisplayMessage, displayMessageEditConfig);
