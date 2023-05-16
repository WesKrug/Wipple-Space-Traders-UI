import Layout from "../components/Layout";
import "../app/globals.css";
import { SpaceTraderProvider } from "@/context/SpaceTraderContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <SpaceTraderProvider>
        <Component {...pageProps} />
      </SpaceTraderProvider>
    </Layout>
  );
}