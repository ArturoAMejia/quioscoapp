import "../styles/globals.css";
import { QuioscoProvider } from "../context/QuisocoProvider";

function MyApp({ Component, pageProps }) {
  return (
    // Le pasamos el provider a toda la app por medio del Context que hemos creado
    <QuioscoProvider>
      <Component {...pageProps} />
    </QuioscoProvider>
  );
}

export default MyApp;
