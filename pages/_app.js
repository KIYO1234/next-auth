import { Provider } from "next-auth/client";
import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    // pagePropsは特殊な初期設定。sessionはpages/profile.jsに設定してある
    // HTTP リクエストの重複を防ぐ（？）
    // 中身はよく分からないが、この書き方が推奨されている（<Provider></Provider> で囲うところ）▼
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
