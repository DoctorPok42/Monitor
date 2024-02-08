import Graduation from "../Graduation";
import { colors } from "../config"

import styles from './styles.module.scss';

interface CoresTempProps {
    data: any;
}

const CoresTemp = ({ data }: CoresTempProps) => {
    const handleColor = (id: number, nb: number) => {
        const test = Math.round((nb - 15) * (25 / 80));
        if (id < test) {
            return colors[id];
        } else {
            return "#10141a";
        }
    }

    return (
        <div className={styles.coresTempContainer}>
            {
                data.map((e: any, i: number) => {
                    return (
                        <div key={i} className={styles.coresTemp}>
                            <p className={styles.dot} style={{
                                backgroundColor: colors[Math.round((e - 15) * (25 / 80)) - 1]
                            }}></p>
                            <h1 className={styles.coresTempTitle}>Core {i + 1}</h1>
                            <h2>{e}°</h2>
                            <Graduation nb={e} handleColor={handleColor} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CoresTemp;
