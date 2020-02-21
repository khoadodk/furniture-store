import App from 'next/app';
import { parseCookies, destroyCookie } from 'nookies';
import axios from 'axios';

import Layout from '../components/_App/Layout';
import { redirectUser } from '../utils/auth';
import baseUrl from '../utils/baseUrl';

class MyApp extends App {
  // https://medium.com/@Hibow/getinitialprops-in-next-js-8b1b7ec8f39
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    /* Redirect user if there is no token */
    if (!token) {
      const isProtectedRoute =
        ctx.pathname === '/account' || ctx.pathname === '/create';
      if (isProtectedRoute) {
        redirectUser(ctx, '/login');
      }
    } else {
      /*
      1. set the token to the header
      2. send it to the api/account for verification and user's data
      3. Upon receiving the data, check the user's role
      4. Redirect user's based on the role
      5. set the user's data to the pageprops
      */
      try {
        const payload = {
          headers: {
            Authorization: token
          }
        };
        const url = `${baseUrl}/api/account`;
        const { data } = await axios.get(url, payload);

        const isRoot = data.role === 'root';
        const isAdmin = data.role === 'admin';
        const isNotPermitted =
          !(isRoot || isAdmin) && ctx.pathname === '/create';
        if (isNotPermitted) {
          redirectUser(ctx, '/');
        }
        pageProps.user = data;
      } catch (error) {
        console.error('Error getting current user', error);
        // throw out invalid token if its invalid or expired
        destroyCookie(ctx, 'token');
        // redirect user to login page
        redirectUser(ctx, '/login');
      }
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}
export default MyApp;
