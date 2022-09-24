import { LabelTypeAtributte } from 'models'
import { Label } from './Label'

interface Props {
    name: LabelTypeAtributte
}

export const Select: React.FC<Props> = ({ name }: Props) => {
    return (
        <div>
            <Label name={name} />
        </div>
    )
}
