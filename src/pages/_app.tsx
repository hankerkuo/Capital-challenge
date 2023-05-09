import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import { config } from '@fortawesome/fontawesome-svg-core'

/**
 * Font awesome large icon adjustment
 * Next.js allows you to import CSS directly in .js files. 
 * It handles optimization and all the necessary 
 * Webpack configuration to make this work.
 */
import '@fortawesome/fontawesome-svg-core/styles.css'
/**
 * You change this configuration value to false so that 
 * the Font Awesome core SVG library will not try and insert 
 * <style> elements into the <head> of the page. 
 * Next.js blocks this from happening anyway so you might as well not even try.
 */
config.autoAddCss = false

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp
