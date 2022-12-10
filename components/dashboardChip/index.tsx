import Image from 'next/image'

export const DashboardChip: React.FC<{
    icon: ReactNode
    title: string
    value: string
    background: string
    iconBackground: string
}> = ({ icon, title, value, background, iconBackground }) => {
    return (
        <div className={`${background} rounded-lg p-4`}>
            <div className="flex flex-row">
                <div
                    style={{ width: 60 }}
                    className={`${iconBackground} rounded-full w-1/9 `}
                >
                    {icon}
                </div>
                <div className="my-auto ml-4">
                    <p className="text-gray-600 font-bold">{title}</p>
                    <p className="font-black">{value}</p>
                </div>
            </div>
        </div>
    )
}
