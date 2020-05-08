import React, { Component } from 'react';
import * as SocialMedia from './SocialMedia/icons';
import { MapTo } from '@adobe/cq-react-editable-components';
import zenscroll from 'zenscroll';
import ScrollToTop from 'react-scroll-up';

require('../Common/Main.css');
require('./footer.css');


const GlobalFooterEditConfig = {
	emptyLabel: 'Global Footer',
	isEmpty: function (props) {
		return !props.heading || props.heading.trim().length < 1;
	}
};

export default class GlobalFooter extends Component {

	constructor(props) {
		super(props)
		this.state = {
			condition: false,
			indexClicked: -1
		}
		//this.handleClick = this.handleClick.bind(this)
	}
	handleClick(index) {
		//	console.log("index is " + index);
		if (!(this.state.condition && this.state.indexClicked === index)) {
			this.setState({
				condition: !this.state.condition,
				indexClicked: index
			})
		}
		else {
			this.setState({
				condition: !this.state.condition,
				indexClicked: -1
			})
		}

	}

	lauchConsentModal = () => {
		// gateway object is returned by the ensighten bootstrap js used to launch the privacy modal
		const gateway = (window).gateway;
		const footerCTA = document.querySelector('.footer-bottom');
		const backdropDiv = document.querySelector('.ensighten-backdrop');
		if (gateway) {
			if (backdropDiv) {
				document.getElementsByTagName('body')[0].appendChild(backdropDiv);
				backdropDiv.classList.add('in');
			}
			if (footerCTA) {
				// (footerCTA as HTMLElement).style.display = 'none';
				document.querySelector('.footer-bottom').style.display = 'none';
			}
			gateway.openModal();
			zenscroll.toY(0, 500, () => { document.getElementsByTagName('body')[0].classList.add('lock-scroll'); });
			this.ensightenModal();
		}
	}
	// this method is used to attach event listeners to enighten CTA
	ensightenModal = () => {
		console.log('ensightenModal start');
		const cancelCTA = document.getElementById('ensCancel');
		const saveCTA = document.getElementById('ensSave');
		if (cancelCTA) {
			document.getElementById('ensCancel').addEventListener('click', this.closeConsentModal);
		}
		if (saveCTA) {
			document.getElementById('ensSave').addEventListener('click', this.closeConsentModal);
		}
		console.log('ensightenModal end');
	}

	// this method is used for removing the backdrop and adding back scroll top cta
	closeConsentModal() {
		const backdropDiv = document.querySelector('.ensighten-backdrop');
		const footerCTA = document.querySelector('.footer-bottom');
		if (backdropDiv) {
			backdropDiv.classList.remove('in');
		}
		if (footerCTA) {
			//(footerCTA as HTMLElement).style.display = 'block';
			document.querySelector('.footer-bottom').style.display = 'block';
		}
		document.getElementsByTagName('body')[0].classList.remove('lock-scroll');

	}




	render() {
		let headingElement = this.props.headline;

		let headingPathElement = this.props.headlinePath;
		let copyRightTextElement = this.props.copyRightText;

		let copyRightLinkElement = this.props.copyRightLink;

		let copyRightDescElement = this.props.copyRightDesc;

		let headPathOpennewwindow = this.props.headPathOpennewwindow;

		let copyopennewwindow = this.props.copyopennewwindow;



		const fcolobj1 = JSON.parse(this.props.footercolumnsOne)
		const fcolobj2 = JSON.parse(this.props.footercolumnsSecond)

		//console.log(fcolobj1);
		//console.log(fcolobj2);

		return (


			<div className="ld-footer">
				<div className="footer">
					<div className="container">
						<div className="col-md-12 privacy-link"><a href={headingPathElement} target={headPathOpennewwindow ? '_blank' : '_self'} title={headingElement}>{headingElement}</a></div>

						<div className="col-xs-9 col-md-9 col-sm-9 footer-accordion">
							{
								fcolobj1.map((key1, i) => {
									return (
										<div key={i}>
											{
												key1.columns.map((key2, j) => {
													return (
														<div key={j}>
															{
																key2.footerlinks.map((key3, k) => {
																	return (
																		<div className={this.state.indexClicked === j ? "footer-link-wrapper footer-section-expanded" : "footer-link-wrapper"} key={key3}>
																			<h4 onClick={() => this.handleClick(j)}>
																				<span dangerouslySetInnerHTML={{ __html: key3.footerColumnHeadline }} data-firetag="72.3"></span>
																			</h4>
																			<ul className={this.state.indexClicked === j ? "footer-accordion show" : "footer-accordion"} key={k} >
																				{
																					key3.linklist.map((key4, k) => {

																						return (

																							<li>

																								<a data-firetag="72.3" data-model={key4.linktitle} data-category={key3.footerColumnHeadline}
																									data-firetag-param={`{"<container>": "Global Footer","<app>": "LD","<nav_category>":"${key3.footerColumnHeadline}","<nav_subcategory>":"${key4.linktitle}" }`}
																									href={key4.linktargeturl} target={key4.openinnew == 'yes' ? "_blank" : "_self"}>{key4.linktitle}</a>
																							</li>
																						)
																					})
																				}
																			</ul>																	{

																			}
																		</div>
																	)
																})
															}
														</div>
													)
												})
											}
										</div>
									)
								})
							}
						</div>


						<div className="col-xs-3 col-md-3 col-sm-3">
							<div className="footer-main-link-wrapper">
								<ul className="main-links" >
									{
										fcolobj2.map((key1, i) => {
											return (
												<li key={i}>
													<a href={key1.linksUrl} target={key1.openinnew == 'yes' ? "_blank" : "_self"}>
														{key1.linkstitle}
													</a>
												</li>
											)
										})

									}
									<li>
										<a className="cookie-consent" data-button-type="ccpa dialog" data-button-location="global nav" onClick={this.lauchConsentModal}>Cookie Consent Options</a>
									</li>
								</ul>
								<ul className="social">
									<SocialMedia.facebook />
									<SocialMedia.twitter />
									<SocialMedia.youtube />
									<SocialMedia.instagram />
								</ul>
							</div>
						</div>
						<div className="copyright">
							<p><a target={copyopennewwindow ? '_blank' : '_self'} href={copyRightLinkElement}>{copyRightTextElement}</a></p>

							<p dangerouslySetInnerHTML={{ __html: copyRightDescElement }}></p>
						</div>
						<div className="footer-bottom">
							<ScrollToTop showUnder={160}>
								<a href="#" className="go-top icons" />
							</ScrollToTop>
						</div>
					</div>
				</div>
				<div className="ensighten-backdrop" />
			</div>




		);
	}
}
MapTo('lexusdrivers/components/content/globalfooter')(GlobalFooter, GlobalFooterEditConfig);