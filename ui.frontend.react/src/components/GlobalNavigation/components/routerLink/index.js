import { Link } from '@sitecore-jss/sitecore-jss-react';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Renders either an internal navlink or an external link, determined
 * dynamically from sitecore data.
 *
 * @param props
 */
const RouterLink = (props) => {
    let jss;
    let href;
    let linktype;

    if (props.field) {
        jss = get(props, 'field.jss', {});
        href = get(props, 'field.jss.value.href', '');
        linktype = get(props, 'field.jss.value.linktype', '');
    }
    if (props.jss) {
        href = get(props, 'jss.value.href', '');
        linktype = get(props, 'jss.value.linktype', '');
        jss = props.jss; 
    }

    

    if (!isEmpty(jss)) {

        if (linktype === 'external') {
            return (
                <Link
                    className={props.className}
                    field={jss}
                    aria-label={JSON.stringify(jss.value)}
                    id={props.id}
                    onClick={props.onClick}
                    target={(jss.value.href.startsWith('/')) ? '' : '_blank'}
                >
                    {props.children}
                </Link>
            );
        } else { // internal or empty linktypes
            return (
                <NavLink
                    className={props.className}
                    to={href}
                    aria-label={JSON.stringify(href)}
                    onClick={() => {
                        /**
                         * If the user is on a silent-route page, and they click on an internal link,
                         * then we need to cancel the silent-route or the page will not reload.
                         *
                         * If they are not on a silent-route page, then firing this action will do nothing.
                         */

                        if (props.onClick) {
                            props.onClick();
                        }
                    }}
                >
                    {props.children}
                </NavLink>
            );
        }
    } else {
        return (
            <NavLink
                className={props.className}
                to="#"
                onClick={props.onClick}
            >
                {props.children}
            </NavLink>
        );
    }
};

export default RouterLink;