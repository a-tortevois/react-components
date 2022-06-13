// import React from "react";
import PropTypes from 'prop-types';

import styles from './CountryFlag.module.scss';

const CountryFlags = (props) => {

    const getCountryFlags = (lang) => {
        try {
            return require(`./assets/${lang}.svg`);
        } catch (e) {
            // Image does not exists
            return null;
        }
    }

    const renderCountryFlags = () => {
        const image = getCountryFlags(props.lang);
        if (image) {
            return <img src={image} alt={props.lang}/>
        } else {
            return <div><span>{props.lang.toUpperCase()}</span></div>
        }
    }

    return (
        <div className={styles["flag-circled"]}>{renderCountryFlags()}</div>
    );
}


CountryFlags.propTypes = {
    lang: PropTypes.string.isRequired,
}

export default CountryFlags;