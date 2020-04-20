import React, {Component} from 'react';
import * as SocialMedia from './SocialMedia/icons';
import {MapTo} from '@adobe/cq-react-editable-components';
require('./main.css');
require('./footer.css');


const GlobalFooterEditConfig = {
    emptyLabel: 'Global Footer',
    isEmpty: function(props) {
        return !props.heading || props.heading.trim().length < 1;
    }
};

export default class GlobalFooter extends Component {
	constructor(props) {    
		super(props)
		this.state = {
		  condition: false
		}
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick() {
		this.setState({
		  condition: !this.state.condition
		})
	}
	
	
	
	
	
    render() {
      let headingElement = this.props.headline;
      
      let headingPathElement=this.props.headlinePath;
      let copyRightTextElement=this.props.copyRightText;
      
      let copyRightLinkElement=this.props.copyRightLink;
      
      let copyRightDescElement=this.props.copyRightDesc;
      
      let headPathOpennewwindow=this.props.headPathOpennewwindow;
      
      let copyopennewwindow=this.props.copyopennewwindow;
      
	  

		const fcolobj1 = JSON.parse(this.props.footercolumnsOne)
		const fcolobj2 = JSON.parse(this.props.footercolumnsSecond)

		console.log(fcolobj1);
		console.log(fcolobj2);
	  
      return (
      
      
		<div className="ld-footer">
				<div className="footer">
						<div className="container">
						<div className="col-md-12 privacy-link"><a href={headingPathElement} target={headPathOpennewwindow ?'_blank':'_self'} title={headingElement}>{headingElement}</a></div>

						<div className="col-xs-9 col-md-9 col-sm-9 footer-accordion">							
							{
								fcolobj1.map((key1, i) => {
									return(
										<div key={i}>
											{
												key1.columns.map((key2, j) => {
													return (
														<div>
															{
																key2.footerlinks.map((key3, k) => {
																	return (
																		<div className={ this.state.condition ? "footer-link-wrapper footer-section-expanded" : "footer-link-wrapper" }>
																	<h4 onClick={ this.handleClick }><span dangerouslySetInnerHTML={ { __html: key3.footerColumnHeadline } }></span></h4>																			{
																				key3.linklist.map((key4, k) => {
																					return(
																						<ul className={ this.state.condition ? "footer-accordion show" : "footer-accordion" } >
																							<li>
																								<a href={key4.linktargeturl} target={key4.openinnew=='yes' ? "_blank" : "_self"}>{key4.linktitle}</a>
																							</li>
																						</ul>
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
									)
								})
							}
						</div>


						<div className="col-xs-3 col-md-3 col-sm-3">
							<div className="footer-main-link-wrapper">
								<ul className="main-links">
									{
										fcolobj2.map((key1, i) => {
											return(											
												<li>
													<a href={key1.linksUrl} target={key1.openinnew=='yes' ? "_blank" : "_self"}>
														{key1.linkstitle}
													</a>
												</li>										
											)
										})
									}
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
								<p><a target={copyopennewwindow ?'_blank':'_self'} href={copyRightLinkElement}>{copyRightTextElement}</a></p>
								
							<p dangerouslySetInnerHTML={ { __html: copyRightDescElement } }></p>
							</div>							
						</div>
					</div>
				</div>
	 
	 
	 
	 
	  );
    }
}
MapTo('lexusdrivers/components/content/globalfooter')(GlobalFooter, GlobalFooterEditConfig);