import styles from './styles.module.scss';

interface GraduationProps {
    nb: number;
    handleColor?: any;
}

const Graduation = ({ nb, handleColor }: GraduationProps) => {
    const numberItems = 25;

    return (
        <>
            <div className={styles.graduation}>
                {
                    [...Array(numberItems)].map((e, i) => {
                        return (
                            <p key={i} className={styles.graduationItem} style={{
                                backgroundColor: handleColor(i, nb)
                            }}></p>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Graduation;
