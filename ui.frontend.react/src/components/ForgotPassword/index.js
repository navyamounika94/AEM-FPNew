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
 npm i react-form-with-constraints-bootstrap4
 npm install react-form-with-constraints
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import React, { Component, ComponentState } from 'react';
import { Redirect } from 'react-router';
import { FormWithConstraints } from 'react-form-with-constraints-bootstrap4';
import { MapTo } from '@adobe/cq-react-editable-components';
import DisplayMessage from '../DisplayMessage';
import { getViewport } from '../GlobalNavigation/components/Viewport/index';
import SiteLoader from '../siteLoader'

require('./forgotPassword.css');

const ForgotPasswordEditConfig = {

    emptyLabel: 'Forgot Password',
    isEmpty: function (props) {
        return true
    }
};

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.textRef = React.createRef();
        this.state = {
            errorDtl: '',
            formErrMsg: '',
            userEmail: '',
            isValidEmail: true,
            //isLoading: false,
            loginStatus: false
        }
    }


    handleChange = (e) => {
        const target = e.target;
        target.setCustomValidity('');
        if (e.target.value == "")
            this.state.isValidEmail = false;
        let isemailValid = this.validateEmail(e.target.value);
    }

    validateEmail(email) {
        const emailRegex = this.props.emailValidations;
        let msg = '';
        let isValid = new RegExp(emailRegex, 'g').test(email);
        if (!isValid) {
            msg = this.props.emailValidationError;
        }
        this.setState({
            userEmail: email,
            isValidEmail: isValid,
            formErrMsg: msg
        });
        if (isValid) {
            document.getElementById('userEmail').classList.remove('is-invalid');
            document.getElementById('userEmail').classList.add('is-valid');
        }
        else {
            document.getElementById('userEmail').classList.remove('is-valid');
            document.getElementById('userEmail').classList.add('is-invalid');
        }
        return isValid;
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        await this.form.validateForm();
        let _isValidEmail = this.validateEmail(this.state.userEmail);
        let endpoint = window.endPointsConfig.dcs3Endpoint + "/admin/customer/password/" + this.state.userEmail;
        let apiKey = window.endPointsConfig.dcsApiKey;
        if (this.form.isValid() && _isValidEmail) {

            var myHeaders = new Headers();
            myHeaders.append("Access-Control-Request-Method", "POST");
            myHeaders.append("x-api-key", apiKey);
            myHeaders.append("X-BRAND", "L");
            myHeaders.append("x-client", "LDNG");
            myHeaders.append("x-version", "1.0");
            document.body.classList.add('loading-overlay-transparent')
            // this.setState({
            //     isLoading: true
            // })
            fetch(endpoint, {
                method: 'POST', headers: myHeaders
            }).then((response) => {
                return response.json();
            }).then((json) => {
                const success = (!!json && json.status.code === '200' && !!json.status.messages && json.status.messages[0].code === 'M00000');
                // this.setState({
                //     isLoading: false
                // })
                document.body.classList.remove('loading-overlay-transparent')
                if (success) {
                    this.setState({ loginStatus: true });

                }
                else {
                    this.setState({ errorDtl: this.props.accountactivationError });
                }
                console.log(json);

            }).catch((error) => {
                setTimeout(() => {
                    document.body.classList.remove('loading-overlay-transparent')
                  }, 5000);
                console.log('error', error);
                this.setState({ loginStatus: false });
            });
            setTimeout(() => {
                document.body.classList.remove('loading-overlay-transparent')
              }, 5000);
        }
    }
    pageLoadMetrics() {
        try {
            if (document.readyState === 'complete') {
                window.fireTag("70.1",
                    {
                        "<section>": "Home", "<subsection>": "Forgot Password", "<tag_id>": "70.1", "<page>": "Forgot Password",
                        "<break_point>": window.digitalData.page["<break_point>"], "<app>": window.digitalData.page["<app>"],
                        "<orientation>": window.digitalData.page["<orientation>"], "<login_status>": window.digitalData.page["<login_status>"], "<zip_code>": "",
                        "<registration_type>": "", "<role>": ""
                    }
                );

            }
            else {
                console.log("pageView|ForgotPassword|Waiting for initialization");
                setTimeout(() => { this.pageLoadMetrics(); }, 1000);
            }
        }
        catch (err) {
            console.log(err, 'FireTag failed');
        }
    }

    componentDidMount() {
        this.pageLoadMetrics();
    }

    render() {
        // const {
        //     //description = "To reset your password, please enter the email associated with your account to receive a password reset link.", //Richtext
        //     emailField = "EMAIL", //text
        //     emailRequiredMessage = '', //JSSText
        //     id = '',
        //     name = '',
        //     needMoreHelp = "Need more help?", // JSSRichText
        //     sendEmailLabel = "Send Email", //JSSText
        //     successPage = '',//JSSLink;
        //     title = "Forgot password?"
        // } = this.props
        return (
            <>
                {
                    this.state.loginStatus == true ? <DisplayMessage
                        diplaytitle={this.props.diplaytitle}
                        displaydescription={this.props.displaydescription}
                        displayprimaryButtonLink={this.props.displayprimaryButtonLink}
                        displayprimaryButtonText={this.props.displayprimaryButtonText}
                        displaysupportContent={this.props.displaysupportContent}
                        displayverticalCenterAlign={this.props.displayverticalCenterAlign}
                        email={this.state.userEmail}>
                     </DisplayMessage> :
                        <div className="container-fluid acc-bg" id="forgot-password">
                            <div className="row justify-content-center " id="titlePanel">
                                <div className="col-12 col-md-11">
                                    <h1>{this.props.title}</h1>
                                    <div className="subtitle">
                                        <div className="m-auto">{this.props.description}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center" id="content-panel">
                                <div className="col-12 align-self-center">
                                    <div className="row justify-content-center" id="formPanel">
                                        <div className="regisForm">
                                            <div className="col-12 col-md-11">
                                                <div className="text-center custom-errmsg" dangerouslySetInnerHTML={{ __html: this.state.errorDtl }}></div>
                                            </div>
                                            <div className="form-group">
                                                <FormWithConstraints
                                                    autoComplete="off"
                                                    ref={(formWithConstraints) => {
                                                        if (formWithConstraints) {
                                                            this.form = formWithConstraints;
                                                        }
                                                    }}
                                                    onSubmit={this.handleSubmit}
                                                    noValidate={true}
                                                    name="accIndvidualname"
                                                    className="accForm forgot-password-form"
                                                >
                                                    <div className="form-group">
                                                        <input
                                                            id="userEmail"
                                                            name="userEmail"
                                                            autoComplete="false"
                                                            value={this.state.userEmail}
                                                            onChange={this.handleChange}
                                                            onBlur={this.handleChange}
                                                            ref={this.textRef}
                                                            className="form-control icase-field"
                                                            required={true}

                                                        />
                                                        <label className={`form-control-placeholder ${this.state.userEmail > 0 ? 'dirty' : 'pristine'}`} htmlFor="userEmail">
                                                            {this.props.emailField}
                                                        </label>

                                                        <div className="text-center invalid-feedback">{this.state.formErrMsg}</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-black "
                                                            data-firetag={this.state.isValidEmail ? '73.6' : '80.4'}
                                                            data-firetag-param={`{"<subsection>": "Home","<tag_id>":"${this.state.isValidEmail ? '73.6' : '80.4'}","<page>": "", "<module>": "${!this.state.isValidEmail ? "Forgot Password Error" : "Forgot Password"}",
                                                            "<error_message>":"${!this.state.isValidEmail ? this.state.formErrMsg : ''}",
                                                            "<action>": "${this.props.sendEmailLabel}","<break_point>":"${getViewport()}"}`}
                                                        >
                                                            {this.props.sendEmailLabel}
                                                        </button>

                                                    </div>
                                                </FormWithConstraints>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center " id="captionPanel">
                                        <div className="col-12 col-md-3 need-help-div">
                                            <span
                                                data-firetag="73.6"
                                                data-firetag-param={`{"<subsection>": "Home","<tag_id>":"73.6","<page>": "", "<module>": "${!this.state.isValidEmail ? "Forgot Password Error" : "Forgot Password"}",
                                            "<action>": "need more help? contact us","<destination_url>":"https://www.lexus.com/contact","<break_point>":"${getViewport()}"}`}
                                            >
                                                <h3 className="caption-link">
                                                    <div className="need-help-richtext" dangerouslySetInnerHTML={{ __html: this.props.needMoreHelp }}></div>
                                                </h3>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
                <SiteLoader/>
            </>

        );
    }
}


export default MapTo('lexusdrivers/components/content/fp')(ForgotPassword, ForgotPasswordEditConfig);