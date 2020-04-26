import { Text as SitecoreText } from '@sitecore-jss/sitecore-jss-react';
import React,{Component} from 'react';
import Disclaimer from '../Disclaimer';

/**
 * A custom RTF component that works similarly to a JSS RTF,
 * except we capture all embedded anchor tags, and render them as
 * RouterLinks.
 */
class Text extends Component {
    constructor(props) {
        super(props);
        this.sitecoreContext = 'normal';
    }
    /**
     * Searches for [D-XXXX] strings in text-nodes and replaces them with Disclaimer Popup elements.
     */
    disclaimerTransform = (data) => {
        const disclaimerRegex = /(.*)\[D-([A-Z0-9,]+)\](.*)/;
        const match = data.match(disclaimerRegex);
        if (match) {
            const before = match[1];
            const after = match[3];

            return (
                <>
                {this.disclaimerTransform(before)}
                <Disclaimer code={match[2]} />
                {this.disclaimerTransform(after)}
                </>
            );
        }

        return data;
    }

    render() {
        if (this.sitecoreContext === 'edit') {
            return <SitecoreText {...this.props}/>;
        }

        const value = (this.props.field && !!this.props.field.value) ? this.props.field.value : '';
        const text = this.disclaimerTransform(value);

        if (this.props.tag) {
            return React.createElement(
                this.props.tag,
                {
                    ...this.props
                },
                text
            );
        } else {
            return text;
        }
    }
}

export default Text;