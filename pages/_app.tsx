import '../styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { ni18nConfig } from 'ni18n.config'
import { appWithI18Next } from 'ni18n'
import { Provider } from 'react-redux'
import { store } from 'store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

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
        <AppProvider>
            <Component {...pageProps} />
        </AppProvider>
    )
}

export default appWithI18Next(App, ni18nConfig)
