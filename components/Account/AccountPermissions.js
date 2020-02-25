import { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { Header, Table, Icon } from 'semantic-ui-react';

import baseUrl from '../../utils/baseUrl';
import UserPermission from './UserPermission';

const AccountPermissions = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    const url = `${baseUrl}/api/users`;
    const token = cookie.get('token');
    const payload = { headers: { Authorization: token } };
    const { data } = await axios.get(url, payload);
    setUsers(data);
  };
  return (
    <div style={{ margin: '2em 0' }}>
      <Header as="h2">
        <Icon name="settings" />
        User Permissions
      </Header>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Joined</Table.HeaderCell>
            <Table.HeaderCell>Updated</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users &&
            users.map(user => <UserPermission {...user} key={user._id} />)}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AccountPermissions;
