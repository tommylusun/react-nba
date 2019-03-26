import React from 'react';
import styles from './player-details.module.css';

const PlayerDetails = (props) => {

    const PLAYER_PROFILE_NAMES = {
        teamName: 'Team',
        country: 'Country',
        dateOfBirthUTC: 'Birth Date',
        // heightFeet: '',
        // heightInches: '',
        heightMeters: 'Height (meters)',
        jersey: 'Jersey Number',
        weightPounds: 'Weight (pounds)',
        nbaDebutYear: 'Debut Year',
    };

    return (
        <div className={styles.playerDetailsContainer}>
        <h2>{props.profile.firstName} {props.profile.lastName}</h2> 
        <p></p>
            {
                Object.keys(PLAYER_PROFILE_NAMES).map((stat, ind) => {
                    return (
                        <div key={stat}>
                            <label className={styles.labelName}>{PLAYER_PROFILE_NAMES[stat]}:</label>
                            <label>{props.profile[stat]}</label>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default PlayerDetails;