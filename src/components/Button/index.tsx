import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core'
import styles from './styles.module.scss'

interface ButtonProps {
    title?: string
    imgSrc?: IconDefinition
    color?: string
    textColor?: string
    onClick?: () => void
    style?: React.CSSProperties
    size?: SizeProp
}

const Button = ({
    title,
    imgSrc,
    color,
    textColor,
    onClick,
    style,
    size
}: ButtonProps) => {
    return (
        <div className={styles.button} style={{
            backgroundColor: color,
            color: textColor,
            ...style
        }} onClick={() => onClick && onClick()}>
            {imgSrc && <FontAwesomeIcon icon={imgSrc} style={{
                color: textColor,
            }} size={
                size ? size : "3x"
            } />}
            {title && <span>{title}</span>}
        </div>
    )
}

export default Button