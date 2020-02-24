import { Checkbox, Table } from 'semantic-ui-react';
import { useState, useEffect, useRef } from 'react';
import cookie from 'js-cookie';

import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import formatDate from '../../utils/formatDate';

const UserPermission = ({ name, email, createdAt, role, _id, updatedAt }) => {
  const [admin, setAdmin] = useState(role === 'admin');

  const handleChangePermission = () => {
    setAdmin(prevState => !prevState);
  };
  const isFirstRun = useRef(true);

  useEffect(() => {
    //prevents execution for each user the first time the component is mounted
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    updatePermission(_id);
  }, [admin]);

  const updatePermission = async _id => {
    const url = `${baseUrl}/api/users/${_id}`;
    const payload = { role: admin ? 'admin' : 'user' };
    const token = cookie.get('token');
    const headers = { headers: { Authorization: token } };
    axios.put(url, payload, headers);
  };
  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox toggle onChange={handleChangePermission} checked={admin} />
      </Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{email}</Table.Cell>
      <Table.Cell>{formatDate(createdAt)}</Table.Cell>
      <Table.Cell>{formatDate(updatedAt)}</Table.Cell>
      <Table.Cell>{admin ? 'admin' : 'user'}</Table.Cell>
    </Table.Row>
  );
};

export default UserPermission;
