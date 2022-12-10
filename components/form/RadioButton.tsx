import { LabelTypeAtributte } from 'models'
import { Label } from './Label'

interface Props {
    text: string
    checked: boolean
    onChange: (value: boolean) => void
    style?: string
}

export const RadioButton: React.FC<Props> = ({
    text,
    checked,
    onChange,
    style,
}: Props) => {
    return (
        <div className={`flex flex-row ${style}`}>
            <input
                className="appearance-none checked:hover:bg-black mr-2 my-auto checked:bg-black hover:bg-black"
                checked={checked}
                onChange={(e) => onChange?.(e.target.checked)}
                type="radio"
            />
            <p className="inline text-center font-extralight my-auto text-sm ">
                {text}
            </p>
        </div>
    )
}
