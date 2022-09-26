import { LabelTypeAtributte } from 'models'
import { Label } from './Label'

interface Props {
    name: LabelTypeAtributte
    options: Array<{
        value: string | number
        text: string
    }>
    onChange: (value: string | number) => void
    style?: string
}

export const Select: React.FC<Props> = ({
    name,
    options = [],
    onChange,
    style,
}: Props) => {
    return (
        <div className={style}>
            <Label name={name} />
            <div>
                <select
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="prueba"
                    className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary"
                >
                    {options.map(({ value, text }) => (
                        <option key={value} value={value}>
                            {text}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

Select.defaultProps = {
    options: [],
}
