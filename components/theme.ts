export const Theme = {
    button: {
        sizes: {
            default: 'w-20',
            xs: 'w-24',
            sm: 'w-32',
            md: 'w-64',
            lg: 'w-80',
            auto: '',
        },
        colors: {
            primary: {
                background: 'bg-primary-50',
                textColor: 'text-white',
            },
            secondary: {
                background: 'bg-transparent',
                textColor: 'text-primary-50',
            },
            link: {
                background: 'bg-transparent',
                color: 'color-link',
                textColor: 'text-primary-50',
            },
        },
        transitions: {
            primary: 'hover:bg-primary-200 hover:border-primary-200',
            secondary: 'hover:text-primary-200 hover:border-primary-200',
            link: 'hover:text-primary-200 hover:border-primary-200',
        },
        rest: {
            primary: 'border-primary-50 border-2',
            secondary: 'border-primary-50 border-2	',
            link: 'underline',
        },
    },
}
