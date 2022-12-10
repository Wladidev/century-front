import { Theme } from 'components/theme'

interface Props {
    size?: 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'auto'
    text: string
    type: 'primary' | 'secondary' | 'link'
    style?: string
    onClick: () => void
}

export const Button: React.FC<Props> = ({
    size = 'default',
    text,
    type = 'primary',
    style,
    onClick,
}: Props) => {
    return (
        <div className={style}>
            <button
                onClick={onClick}
                className={`
                    ${Theme.button.colors[type]?.background} px-8 py-2
                    ${Theme.button.colors[type]?.textColor}
                    ${Theme.button?.rest[type]}
                    rounded font-bold text-ellipsis overflow-hidden whitespace-nowrap 
                    ${Theme.button?.sizes[size]} transition ease-in-out delay-150  
                     ${Theme.button?.transitions[type]} duration-300`}
            >
                {text}
            </button>
        </div>
    )
}
