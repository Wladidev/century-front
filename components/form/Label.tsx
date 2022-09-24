import { LabelTypeAtributte } from 'models'
import React from 'react'

interface LabelProps {
    name: LabelTypeAtributte
}

export const Label: React.FC<LabelProps> = ({ name }: LabelProps) => {
    return (
        <>
            {typeof name === 'string' ? (
                <label
                    htmlFor={name}
                    className="block text-md text-gray-900 font-medium"
                >
                    {name}
                </label>
            ) : (
                typeof name === 'function' && name
            )}
        </>
    )
}
