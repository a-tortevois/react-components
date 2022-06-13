import {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';

import styles from "./ArcProgressBar.module.scss";

const ArcProgressBar = (props) => {

    const [offset, setOffset] = useState(0);
    const progressRef = useRef(null);

    // Fix value to 0 -> 100%
    const value = (props.value < 0) ? 0 : (props.value > 100) ? 100 : props.value || 0;

    // Fix diameter to 100 -> 250
    const diameter = (props.diameter < 100) ? 100 : (props.diameter > 250) ? 250 : props.diameter;
    const center = diameter / 2;
    const radius = center - (props.strokeWidth / 2);

    const angle = (props.angle < 0) ? 0 : (props.angle > 360) ? 360 : props.angle;
    const θ = angle * Math.PI / 360;
    const circumference = radius * angle * (Math.PI / 180);
    const x1 = center - radius * Math.sin(θ);
    const y = center - radius * Math.cos(θ);
    const x2 = center + radius * Math.sin(θ);
    // const x_axis_rotation = 0;
    const large_arc_flag = (angle < 180) ? 0 : 1;
    // const sweep_flag = 1;
    // A rx ry rotate large_arc_flag sweep_flag x y
    const d = `M ${x1} ${y} A ${radius} ${radius} 0 ${large_arc_flag} 1 ${x2} ${y}`;

    useEffect(() => {
            if (value === 0) {
                setOffset(circumference - 0.1);
            } else {
                setOffset(((100 - value) / 100) * circumference);
            }
            // Add a transition effect
            progressRef.current.style = 'transition: stroke-dashoffset 250ms ease-in-out';
        },
        [value, circumference]
    );

    return (
        <div className={styles["arc-progress-bar"]}>
            <svg width={diameter} height={diameter}>
                <path className={styles["background"]}
                      d={d}
                      stroke={props.strokeBackgroundColor}
                      strokeWidth={props.strokeWidth}
                      strokeLinecap={"round"}>
                </path>
                <path className={styles["progress"]}
                      ref={progressRef}
                      d={d}
                      stroke={props.strokeProgressColor}
                      strokeWidth={props.strokeWidth}
                      strokeLinecap={"round"}
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}>
                </path>
                <text x={center} y={center}>
                    {value}%
                </text>
            </svg>
        </div>
    );
}

ArcProgressBar.propTypes = {
    angle: PropTypes.number.isRequired,
    diameter: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    strokeBackgroundColor: PropTypes.string.isRequired,
    strokeProgressColor: PropTypes.string.isRequired,
    value: PropTypes.number,
}

export default ArcProgressBar;