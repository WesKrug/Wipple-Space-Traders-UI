import Layout from "../components/molecules/Layout";
import "../app/globals.css";
import { SpaceTraderProvider } from "@/context/SpaceTraderContext";
import { NextUIProvider, createTheme } from "@nextui-org/react";

// 2. Call `createTheme` and pass your custom theme values
const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      primary: '#FFFFFF',
      secondary: '#F9CB80',
      error: '#FCC5D8',
    },
  }
})


export default function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider theme={theme}>
      <SpaceTraderProvider >
        <Layout>
            <Component {...pageProps} />
        </Layout>
      </SpaceTraderProvider>
    </NextUIProvider>
  );
}