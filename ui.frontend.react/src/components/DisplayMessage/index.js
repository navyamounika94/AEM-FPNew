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
    // props are only for display purpose. Actual values come from AEM component propeerties.
    static defaultProps = {
        description: "We sent password reset instructions to <strong>hussaindotnet@gmail.com</strong>. If you didn't receive the email, please check your spam folder",//RichText
        primaryButtonLink: "/lexusdrivers/account/login",//link
        primaryButtonText: "OK",//textbox
        supportContent: "RESEND PASSWORD RESET EMAIL",//RichText
        title: "Success",//textbox
        verticalCenterAlign: true,//checkbox
        name: "DisplayMessage" //textbox
    }
    render() {
        let boxClass = 'pg-box';
        if (this.props.verticalCenterAlign === false) {
            boxClass = '';
        }
        return (
            <div className={`row dispMsgWrapper ${boxClass}`} >
                <div className="col">
                    <Card className="text-center">
                        <CardBody>
                            {this.props.title && <CardTitle>
                                {this.props.title}
                            </CardTitle>}
                            {this.props.description && <CardText className="col-8 m-auto" tag="div">
                                {this.props.description}
                            </CardText>}
                            {this.props.primaryButtonLink && this.props.primaryButtonText &&
                                <CardText tag="h5">
                                    <a href={this.props.primaryButtonLink} class="btn-black  btn btn-secondary" target="">{this.props.primaryButtonText}</a>
                                </CardText>
                            }
                            {this.props.supportContent &&
                                <CardText tag="h5">
                                    <a class="rich-text-anchor active" aria-current="page" href="/lexusdrivers/account/forgot-password"> {this.props.supportContent}</a>
                                </CardText>
                            }
                        </CardBody>
                    </Card>
                </div>
            </div>

        );

    }
}

export default MapTo('sample/components/displayMessage')(DisplayMessage, displayMessageEditConfig);
 // change to correct path of AEM component