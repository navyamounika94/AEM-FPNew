import { RichText } from '@sitecore-jss/sitecore-jss-react';
import get from 'lodash.get';
import React,{Component} from 'react';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import { withRouter } from 'react-router-dom';
import Disclaimer from '../Disclaimer';
import RouterLink from '../routerLink';


/**
 * A custom RTF component that works similarly to a JSS RTF,
 * except we capture all embedded anchor tags, and render them as
 * RouterLinks.
 */
class RouterLinkedRichText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tooLong: false,
            truncate: true,
            wasTruncated: false,
        };
    }

    /**
     * Convert an HTML Anchor tag into a redux-connected RouterLink component.
     *
     * @param node HTML Node element, passed from the html-react-parser library
     */
    anchorTransform(node) {
        const href = get(node, 'attribs.href', '');

        /**
         * In the Sitecore Rich Text editor, Content-Authors have 3 options for making a given link external:
         *  - Use a full URL
         *  - Use a relative URL and add the segment `data-external="true"` to the anchor tag's HTML
         *  - Use a relative URL and set any Target attribute on the element (sitecore-generated internal links never have target attributes)
         */
        const dataExternal = get(node, 'attribs.data-external');
        const target = get(node, 'attribs.target');

        const isInternal = (!!target || dataExternal === 'true') ? false : (href.startsWith('/'));

        // A mock Link datasource created from the data in our anchor tag.
        const routerLinkJss = {
            jss: {
                value: {
                    href,
                    linktype: isInternal ? 'internal' : 'external',
                }
            }
        };

        const linkRef = React.createRef();

        return (
            <RouterLink
                className={node.name === 'a' ? 'rich-text-anchor' : ''}
                field={routerLinkJss}

                onClick={() => {
                    if (this.props.onLinkClick) {
                        this.props.onLinkClick(href, linkRef);
                    }
                }}
            >
                {/* Continue to parse the anchor tag's children with react-html-parser */}
                {node.children.map((child) => {
                    return convertNodeToElement(child);
                })}
            </RouterLink>
        );
    }

    /**
     * When text is truncated, expand the text and show 'readless'
     */
    expand = () => {
        this.setState({
            truncate: false,
            wasTruncated: true
        });
    }

    /**
     * When text is expanded, collapse the text and show 'readmore'
     */
    collapse = () => {
        this.setState({
            truncate: true,
            wasTruncated: false
        });
    }

    /**
     * Determine final length of a string AFTER disclaimer text has been substituted for single asterisks
     */
    finalLength = (s) => {
        const disclaimerRegex = /(.*)\[D-([A-Z0-9,]+)\](.*)/;
        const match = s.match(disclaimerRegex);

        if (match) {
            return match[1].length + 1 + match[2].length;
        }
        return s.length;
    }

    /**
     * Searches for [D-XXXX] strings in text-nodes and replaces them with Disclaimer Popup elements.
     * Additionally, truncates the entire string based on a given length
     *
     * @param node Whole Text Node to parse and transform
     * @param lengthLimit Maximum size of the text. If the lengthLimit < length of text, then teh text is truncated.
     */
    disclaimerTransform = (node, lengthLimit = 99999) => {
        const disclaimerRegex = /(.*)\[D-([A-Z0-9,]+)\](.*)/;
        const match = node.data.match(disclaimerRegex);

        if (match) { // Means there is a [D-xxxx] code somewhere in the text. It needs to be replaced with a Disclaimer popup.

            const before = match[1]; // All the text before the [D-xxxx] code
            const after = match[3]; // All the text after the [D-xxxx] code

            // Len of teh before/after text AFTER the disclaimer replacement is performed
            const beforeLen = this.finalLength(before);
            const afterLen = this.finalLength(after);

            if (this.state.truncate && beforeLen > lengthLimit) {
                // The before text is too long. Truncate and display only the before text and '... Read more'
                return (
                    <>
                        {before.slice(0, lengthLimit - 3)}
                        <span className="richtext-read-more" onClick={this.expand}>...</span>
                    </>
                );
            }

            if (this.state.truncate && beforeLen + 1 + afterLen > lengthLimit) {
                // The Before text + After text is too long. Display all the before text, then truncate the after text
                return (
                    <>
                        {this.disclaimerTransform({type: 'text', data: before})}
                        <Disclaimer code={match[2]} />
                        {after.slice(0, lengthLimit - beforeLen - 3)}
                        <span className="richtext-read-more" onClick={this.expand}>...</span>
                    </>
                );
            }

            // The lengthLimit has not been exceeded
            const beforeNode = {type: 'text', data: before};
            const afterNode = {type: 'text', data: after};

            return (
                <>
                    {this.disclaimerTransform(beforeNode)}
                    <Disclaimer code={match[2]} />
                    {this.disclaimerTransform(afterNode)}
                </>
            );
        }

        if (this.state.truncate && node.data.length > lengthLimit) {
            // Text node exceeds lengthlimit
            return (
                <>
                    {node.data.slice(0, lengthLimit - 3)}
                    <span className="richtext-read-more" onClick={this.expand}>...</span>
                </>
            );
        } else {
            // Text node doesn't exceed length limit
            return node.data;
        }
    }

    // tslint:disable-next-line: cognitive-complexity
    render() {

        /**
         * With this component, we have encountered issues involving SSR and React.Hydrate
         * When the server runs React.createElement, it sometimes fails to add the correct classNames on the wrapping node.
         *
         * To get around this, RichText fields are not rendered on the server-side. This forces a full
         * rerender of the comopnent during client-side hydration.
         */
        const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
        if (!canUseDOM) {
            return null;
        }

        /**
         * Another check on the client-side for Sitecore's experience-editor and preview modes.
         * In these modes, we simply use the Sitecore-provided RichText component (which integrates well with the Experience Editor).
         */
        if (this.props.sitecoreContext !== 'normal') {
            return (
                <RichText field={this.props.field} />
            );
        }

        let maxLength = 999999;
        if (this.props.lengthLimit && typeof this.props.lengthLimit === 'number') {
            maxLength = this.props.lengthLimit;
        }
        if (this.props.lengthLimit && this.props.lengthLimit[this.props.viewport ? this.props.viewport : 'DESKTOP']) {
            maxLength = this.props.lengthLimit[this.props.viewport ? this.props.viewport : 'DESKTOP'];
        }

        /**
         * For normal client-side views:
         * Using the react-html-parser library, we take the html string given to us by sitecore, and convert it into a React Element Tree.
         *
         * In the process, we transform all anchor tags into RouterLink components, which
         * adds additional Routing functionality and Analytics tagging.
         */
        const html = get(this.props, 'field.value', '');
        const tag = (this.props.tag) ? this.props.tag : 'div';
        return React.createElement(
            tag,
            {
                className: this.props.className,
            },
            [
                ReactHtmlParser(html, {
                    transform: (node, index) => {
                        if (node.type === 'text') {
                            return this.disclaimerTransform(node, maxLength);
                        }
                        if (node.type === 'tag' && node.name === 'a') {
                            return this.anchorTransform(node);
                        }
                        return;
                    }
                }),

                this.state.wasTruncated ?
                    <>{' '}<span className="richtext-read-less" onClick={this.collapse}>&#60;</span></>
                    :
                null
            ]
        );
    }
}

export default withRouter(RouterLinkedRichText);