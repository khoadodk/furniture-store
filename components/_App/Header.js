import { Menu, Container, Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import NProgess from 'nprogress';

import { handleLogout } from '../../utils/auth';

Router.onRouteChangeStart = () => NProgess.start();
Router.onRouteChangeComplete = () => NProgess.done();

const Header = ({ user }) => {
  const router = useRouter();
  const isRootOrAdmin =
    (user && user.role === 'root') || (user && user.role === 'admin');

  const isActive = route => {
    return route === router.pathname;
  };

  return (
    <Menu stackable fluid id="menu" inverted>
      <Container text>
        <Link href="/">
          <Menu.Item header active={isActive('/')}>
            <Image
              size="mini"
              src="/static/Logo.ico"
              style={{ marginRight: '1em' }}
            />{' '}
            Home
          </Menu.Item>
        </Link>

        <Link href="/search">
          <Menu.Item header active={isActive('/search')}>
            <Icon name="search" size="large" />
            Search
          </Menu.Item>
        </Link>

        <Link href="/cart">
          <Menu.Item header active={isActive('/cart')}>
            <Icon name="cart" size="large" />
            Cart
          </Menu.Item>
        </Link>

        {isRootOrAdmin && (
          <Link href="/create">
            <Menu.Item header active={isActive('/create')}>
              <Icon name="add square" size="large" />
              Create
            </Menu.Item>
          </Link>
        )}

        {user ? (
          <>
            <Link href="/account">
              <Menu.Item header active={isActive('/account')}>
                <Icon name="user" size="large" />
                Account
              </Menu.Item>
            </Link>

            <Menu.Item header onClick={() => handleLogout()}>
              <Icon name="sign out" size="large" />
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Link href="/login">
              <Menu.Item header active={isActive('/login')}>
                <Icon name="sign in" size="large" />
                Login
              </Menu.Item>
            </Link>

            <Link href="/signup">
              <Menu.Item header active={isActive('/signup')}>
                <Icon name="signup" size="large" />
                Signup
              </Menu.Item>
            </Link>
          </>
        )}
      </Container>
    </Menu>
  );
};

export default Header;
