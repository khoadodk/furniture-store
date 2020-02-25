import { parseCookies } from 'nookies';
import axios from 'axios';

import baseUrl from '../utils/baseUrl';
import AccountHeader from '../components/Account/AccountHeader';
import AccountOrders from '../components/Account/AccountOrders';
import AccountPermissions from '../components/Account/AccountPermissions';

const Account = ({ user, orders }) => {
  return (
    <>
      <AccountHeader {...user} />
      <AccountOrders orders={orders} />
      {user.role === 'root' && <AccountPermissions />}
    </>
  );
};

Account.getInitialProps = async ({ ctx }) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { orders: [] };
  } else {
    const url = `${baseUrl}/api/orders`;
    const payload = { headers: { Authorization: token } };
    const { data } = await axios.get(url, payload);
    return { orders: data };
  }
};

export default Account;
