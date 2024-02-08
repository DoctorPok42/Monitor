import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

interface BarProps {
    title: string;
    data: number;
    use: number;
    maxValue: number;
}

const Bar = ({ title, data, use, maxValue }: BarProps) => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        let percent = (data / maxValue) * 100;
        if (percent > 100) {
            percent = 100;
        }

        let i = 0;
        const timer = setInterval(() => {
            if (i < percent) {
                i++;
                setPercent(i);
            } else {
                clearInterval(timer);
            }
        }, 10);
    }, [use, maxValue, data]);

    return (
        <>
            <div className={styles.bar}>
                <div className={styles.barTitle}>
                    <h2>{title}</h2>
                </div>
                    <span style={{
                        color: percent > 80 ? "#ff767f" : percent > 60 ? "#ffce1c" : "#00e5bd"
                    }}>{percent.toFixed(0)}% Used</span>
                <div className={styles.use}>
                    <h2>{data.toFixed(2)} GB</h2>
                </div>
                <p className={styles.barValue} style={{
                    width: `${percent}%`,
                    backgroundColor: percent > 80 ? "#ff767f" : percent > 60 ? "#ffce1c" : "#00e5bd"
                }}></p>
            </div>
        </>
    )
}

export default Bar;
