import React, {Component} from 'react';
import ArrowIcon from '../images/Icon-Arrow-Large.svg';
import CloseIcon from '../images/icon-Close-60x60.png';


export class LdNavSearch extends Component {

    constructor(props) {    
		super(props)
		this.state = {
            searchInput: ''
        };
	}

    handleChange = (e) => {
        this.setState({
            searchInput: (e.target.value),
        });
    }

    switchView = () => {
        if (this.props.isDesktop) {
            this.props.toggleSearchbar();
            this.setState({
                searchInput: ''
            });
        } else {
            this.props.toggleNav();
            this.setState({
                searchInput: ''
            });
        }
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.showSearchResults();
        }
    }

    /**
     * Parse the GQL Response for fields that we use
     *
     * @return { placeholderText: string, searchUrlRelativePath: string} | null
     */
    getFields = () => {
        if (this.props.placeholdertext && this.props.searchUrlPath) { // In case of query failure, content.item returns null
            return {
                placeholderText: this.props.placeholdertext,
                searchUrlRelativePath: this.props.searchUrlPath
            };
        }

        return null;
    }

    showSearchResults = () => {
        const fields = this.getFields();
        if (fields) {
            // Example url: /lexusdrivers/search?searchKey=
            window.location.href = fields.searchUrlRelativePath + encodeURIComponent(this.state.searchInput);
        }
    }

    render() {
        const fields = this.getFields();
        if (!fields) {
            return null;
        }

        return (
                <form className="form-inline">
                    <input
                        autoFocus={true}
                        ref={this.props.inputRef}
                        type="text"
                        className="form-control navsearchInput"
                        placeholder={fields.placeholderText}
                        onChange={this.handleChange}
                        onKeyPress={this.onKeyPress}
                        value={this.state.searchInput}
                    />

                    <div className="rightArrowdiv" onClick={this.showSearchResults}>
                        <img src={ArrowIcon} className="rightArrowStyle" alt="Right Arrow" />
                    </div>

                    <img src={CloseIcon} alt="closeIcon" onClick={this.switchView} />

                </form>
        );
}
}

export default LdNavSearch;
