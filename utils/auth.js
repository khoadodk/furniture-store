import cookie from 'js-cookie';
import Router from 'next/router';

export const handleLogin = token => {
  cookie.set('token', token);
  Router.push('/account');
};

export const handleLogout = token => {
  cookie.remove('token', token);
  Router.push('/login');
};

export function redirectUser(ctx, location) {
  if (ctx.req) {
    // redirect on server
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    // redirect on client
    Router.push(location);
  }
}
