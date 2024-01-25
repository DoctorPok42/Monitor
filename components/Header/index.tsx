import { use, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import FormatDate from './format';
import styles from './styles.module.scss';

interface HeadersProps {
    title: string;
    newDate?: string;
    setNewDate?: (actualDate: string) => void;
}

const Header = ({ title, newDate, setNewDate }: HeadersProps) => {
    const [actualDate] = useState<string>(new Date().toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "numeric",
      year: "numeric"
    }));

    const handleDate = (e: any) => {
        const date = new Date(e.target.value);
        date.setDate(date.getDate() + 1);

        setNewDate && setNewDate(date.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "numeric",
            year: "numeric"
        }));
    }

    return (
        <div className={styles.header}>
            <h2>{title}</h2>
            {newDate && <div className={styles.time}>
                <FontAwesomeIcon
                    style={{
                        marginRight: "0.5rem"
                    }}
                    icon={faClock}
                />

                <span>
                    {
                        actualDate !== newDate ?
                        FormatDate(newDate) + " - " + FormatDate(actualDate) :
                        FormatDate(actualDate)
                    }
                </span>

                <input
                    id='date'
                    type="date"
                    onChange={(e) => handleDate(e)}
                    max={
                        actualDate.split("/").reverse().join("-")
                    }
                    style={{
                        border: "none",
                        outline: "none",
                        overflow: "hidden",
                        background: "transparent",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        marginLeft: "0.5rem",
                        userSelect: "none",
                        width: "1.2rem"
                    }}
                />
            </div>}
        </div>
    );
}

export default Header;