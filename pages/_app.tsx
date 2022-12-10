import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-calendar/dist/Calendar.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { ni18nConfig } from 'ni18n.config'
import { appWithI18Next } from 'ni18n'
import { Provider } from 'react-redux'
import { store } from 'store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { NextUIProvider } from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'

let persistor = persistStore(store)

function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

function App({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider>
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
            <ToastContainer />
        </NextUIProvider>
    )
}

export default appWithI18Next(App, ni18nConfig)
