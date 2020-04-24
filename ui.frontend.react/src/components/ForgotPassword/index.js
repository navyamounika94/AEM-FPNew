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
            isValidEmail: false,
            isLoading: false,
			loginStatus: false
        }
    }


    handleChange = async (e) => {
        const target = e.target;

        target.setCustomValidity('');
        this.ValidateEmailData(e.target.value);

    }
    ValidateEmailData(val) {
        const isValid = this.validateEmail(val);
        let msg = '';
        if (!isValid) {
            msg = "Please enter valid email address";
        }
        this.setState({
            userEmail: val,
            isValidEmail: isValid,
            formErrMsg: msg
        });
    }
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        await this.form.validateForm();
        this.ValidateEmailData(this.state.userEmail);
        let _isValidEmail = this.validateEmail(this.state.userEmail);
        if (this.form.isValid() && _isValidEmail) {
            var myHeaders = new Headers();
            myHeaders.append("Access-Control-Request-Method", "POST");
            myHeaders.append("x-api-key", "kkveIpcTwE57HNHQl4oiBX2UcI7smBM7lQm1YtZd");
            myHeaders.append("X-BRAND", "L");
            myHeaders.append("x-client", "LDNG");
            myHeaders.append("x-version", "1.0");
            fetch("https://api.siint.deops.toyota.com/admin/customer/password/" + this.state.userEmail, {
                method: 'POST', headers: myHeaders
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
				console.log('error');
                console.log(json);
            }).catch((error) => {
				console.log(error);
				this.setState({ loginStatus: true });
			});
        }
    }

    render() {
        const {
            description = "To reset your password, please enter the email associated with your account to receive a password reset link.", //Richtext
            emailField = "EMAIL", //text
            emailRequiredMessage = '', //JSSText
            id = '',
            name = '',
            needMoreHelp = "Need more help?", // JSSRichText
            sendEmailLabel = "Send Email", //JSSText
            successPage = '',//JSSLink;
            title = "Forgot password?"
        } = this.props
        return (
            <>
				{                    
                    this.state.loginStatus == true ? <DisplayMessage 
                                    diplaytitle={this.props.diplaytitle} 
                                    displaydescription={this.props.displaydescription} 
                                    displaydescription2={this.props.displaydescription2} 
                                    displayprimaryButtonLink={this.props.displayprimaryButtonLink} 
                                    displayprimaryButtonText={this.props.displayprimaryButtonText} 
                                    displaysupportContent={this.props.displaysupportContent} 
                                    displayverticalCenterAlign={this.props.displayverticalCenterAlign} 
                                    email={this.state.userEmail}>                                    
                                </DisplayMessage>:  
					<div className="container-fluid acc-bg" id="forgot-password">
						<div className="row justify-content-center " id="titlePanel">
							<div className="col-12 col-md-11">
								<h1>{title}</h1>
								<div className="subtitle">
									<div className="m-auto">{description}</div>
								</div>
							</div>
						</div>
						<div className="row justify-content-center" id="content-panel">
							<div className="col-12 align-self-center">
								<div className="row justify-content-center" id="formPanel">
									<div className="regisForm">
										<div className="col-12 col-md-11">
											<div className="text-center custom-errmsg">{this.state.errorDtl}</div>
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

												<input
													id="userEmail"
													name="userEmail"
													value={this.state.userEmail}
													placeholder={emailField}// aem
													onChange={this.handleChange}
													ref={this.textRef}
													className={`form-control icase-field ${this.state.isValidEmail ? 'is-valid' : 'is-invalid'}`
													}

												/>
												<div className="text-center invalid-feedback">{this.state.formErrMsg}</div>
												<div className="text-center">
													<button

														type="submit"
														className="btn btn-black "
													>
														{sendEmailLabel}
													</button>

												</div>
											</FormWithConstraints>
										</div>
									</div>
								</div>
								<div className="row justify-content-center " id="captionPanel">
									<div className="col-12 col-md-3 need-help-div">
										<span>
											<h3 className="caption-link"> {needMoreHelp} <a className="rich-text-anchor" href="">Contact Us</a></h3>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
                }
                
            </>

        );
    }
}


export default MapTo('lexusdrivers/components/content/forgotPassword')(ForgotPassword, ForgotPasswordEditConfig);