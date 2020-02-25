import { useState } from 'react';
import axios from 'axios';
import { Card, Image, Form, Segment } from 'semantic-ui-react';
import Link from 'next/link';

import baseUrl from '../utils/baseUrl';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    const url = `${baseUrl}/api/products`;
    const payload = { params: { searchQuery } };
    const response = await axios.get(url, payload);
    setProducts(response.data.products);
  };

  const mapProductsToItems = products => {
    return products.map(({ _id, name, mediaUrl, price }) => (
      <Link key={_id} href="/product/[_id]" as={`/product/${_id}`}>
        <Card fluid color="teal">
          <Image src={mediaUrl} />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>${price}</Card.Meta>
          </Card.Content>
        </Card>
      </Link>
    ));
  };
  return (
    <div>
      <Form onSubmit={handleFormSubmit}>
        <Form.Input placeholder="Search by name" onChange={handleChange} />
      </Form>
      {products.length > 0 ? (
        <Segment>
          <h3 class="ui header centered">{products.length} products found!</h3>
          <Card.Group stackable itemsPerRow="3" centered>
            {mapProductsToItems(products)}
          </Card.Group>
        </Segment>
      ) : (
        <Segment>
          <h3 class="ui header centered">{products.length} products found!</h3>
        </Segment>
      )}
    </div>
  );
};

export default Search;
