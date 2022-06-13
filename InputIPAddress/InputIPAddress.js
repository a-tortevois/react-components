// import {useEffect, useState} from "react";
import PropTypes from 'prop-types';

import styles from "./InputIPAddress.module.scss";

const InputIPAddress = (props) => {

    const getDigits = (value) => {
        if (value) {
            const digits = value.split('.');
            if (digits.length === 4) {
                return digits.map(value => parseInt(value));
            }
        }
        return [192, 168, 1, 1];
    }

    /*
    const [value, setValue] = useState(getDigits(props.value));

    useEffect(() => {
            setValue(getDigits(props.value));
        },
        [props.value]
    );
    */

    const value = getDigits(props.value);

    const handleChange = (e) => {
        if (e.target.value <= 0) {
            e.target.value = 0
        } else if (e.target.value > 255) {
            e.target.value = 255
        }
    }

    return (
        <div className={styles['input-ip']}>
            <input type="number" id={`${props.id}[0]`} onChange={handleChange} value={value[0]}/>&nbsp;.&nbsp;
            <input type="number" id={`${props.id}[1]`} onChange={handleChange} value={value[1]}/>&nbsp;.&nbsp;
            <input type="number" id={`${props.id}[2]`} onChange={handleChange} value={value[2]}/>&nbsp;.&nbsp;
            <input type="number" id={`${props.id}[3]`} onChange={handleChange} value={value[3]}/>
        </div>
    );
}

InputIPAddress.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
}

export default InputIPAddress;