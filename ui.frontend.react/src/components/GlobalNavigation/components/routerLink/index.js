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

    const dataMetrics = {
        'data-metrics-action': props.action,
        'data-metrics-button_text': props.button_text,
        'data-metrics-container': props.container,
        'data-metrics-dealer_name' : props.dealer_name,
        'data-metrics-event-name': props.tag_id,
        'data-metrics-field': JSON.stringify(jss),
        'data-metrics-module': props.module,
        'data-metrics-nav_category' : props.nav_category,
        'data-metrics-nav_subcategory': props.nav_subcategory,
        'data-metrics-section': props.section,
        'data-metrics-subsection': props.subsection,
    };

    if (!isEmpty(jss)) {

        if (linktype === 'external') {
            return (
                <div>
                    <Link
                        className={props.className}
                        field={jss}
                        aria-label={JSON.stringify(jss.value)}
                        {...dataMetrics}
                        id={props.id}
                        onClick={props.onClick}
                        target={(jss.value.href.startsWith('/')) ? '' : '_blank'}
                    >
                        {props.children}
                    </Link>
                </div>
            );
        } else { // internal or empty linktypes
            return (
                <div>
                <NavLink
                    className={props.className}
                    to={href}
                    {...dataMetrics}
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
                </div>
            );
        }
    } else {
        return (
            <div>
                <NavLink
                    className={props.className}
                    to="#"
                    {...dataMetrics}
                    onClick={props.onClick}
                >
                    {props.children}
                </NavLink>
            </div>
        );
    }
};

export default RouterLink;