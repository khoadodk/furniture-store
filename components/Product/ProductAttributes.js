import { useState } from 'react';
import { Header, Button, Modal } from 'semantic-ui-react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import baseUrl from '../../utils/baseUrl';

const ProductAttributes = ({ description, _id, user }) => {
  const router = useRouter();
  const [modal, setModal] = useState(false);

  const isRootOrAdmin =
    (user && user.role === 'root') || (user && user.role === 'admin');

  const handleDelete = async () => {
    const url = `${baseUrl}/api/product/${_id}`;
    const payload = { params: { _id } };
    await axios.delete(url, payload);
    router.push('/');
  };

  return (
    <>
      <Header as="h3">About this product</Header>
      <p>{description}</p>

      {isRootOrAdmin && (
        <>
          <Link href="/edit/[_id]" as={`/edit/${_id}`}>
            <Button icon="edit outline" color="blue" content="Edit" />
          </Link>

          <Button
            icon="trash alternate outline"
            color="red"
            content="Delete"
            onClick={() => setModal(true)}
          />
          <Modal open={modal} dimmer="blurring">
            <Modal.Header>Confirm Delete</Modal.Header>
            <Modal.Content>
              <p>Are you sure you want to delete this product?</p>
            </Modal.Content>

            <Modal.Actions>
              <Button content="Cancel" onClick={() => setModal(false)} />
              <Button
                negative
                icon="trash"
                labelPosition="right"
                content="Delete"
                onClick={handleDelete}
              />
            </Modal.Actions>
          </Modal>
        </>
      )}
    </>
  );
};

export default ProductAttributes;
