import { LabelTypeAtributte } from 'models'
import React from 'react'
import { Label } from './Label'

interface Props {
    name: LabelTypeAtributte
    onChange: (value: Object) => void
    prefix?: string
    suffix?: string | React.ReactNode
    placeholder?: string
    type: React.HTMLInputTypeAttribute
    value: string
    id: string
    style?: string
}

export const Input: React.FC<Props> = ({
    name,
    onChange,
    prefix,
    suffix,
    placeholder,
    type,
    value,
    id,
    style,
}: Props) => {
    return (
        <div className={style}>
            <Label name={name} />
            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {prefix && (
                        <span className="text-gray-500 sm:text-sm">
                            {prefix}
                        </span>
                    )}
                </div>
                <input
                    onChange={(e) => onChange(e)}
                    type={type}
                    name={id}
                    value={value}
                    id={id}
                    className={`block w-full rounded-md border-black ${
                        prefix && 'pl-7'
                    } ${
                        suffix && 'pr-12'
                    }  focus:border-primary-50 focus:ring-primary-50 sm:text-sm`}
                    placeholder={placeholder}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    {suffix && suffix}
                </div>
            </div>
        </div>
    )
}
