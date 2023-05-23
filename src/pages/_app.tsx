import Layout from "../components/molecules/Layout";
import "../app/globals.css";
import { SpaceTraderProvider } from "@/context/SpaceTraderContext";
import { ErrorContextProvider } from "@/context/ErrorContext";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorContextProvider>
      <SpaceTraderProvider >
        <Layout>
            <Component {...pageProps} />
        </Layout>
      </SpaceTraderProvider>
    </ErrorContextProvider>
  );
}