import Layout from "../components/Layout";
import { Home } from "../components/Home";

export default function IndexPage() {
  // const updateDocumentHeightCSSProperty = () => {
  //   if (typeof window !== 'undefined') {
  //     const doc = window.document.documentElement;
  //     doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
  //   }
  // };

  // if (typeof window !== 'undefined') {
  //   window.addEventListener('resize', updateDocumentHeightCSSProperty);
  //   updateDocumentHeightCSSProperty();
  // }

  return (
    <Home />
  );
}