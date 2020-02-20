import { Card, Image } from 'semantic-ui-react';
import Link from 'next/link';

const ProductList = ({ products }) => {
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
    <Card.Group stackable itemsPerRow="3" centered>
      {mapProductsToItems(products)}
    </Card.Group>
  );
};

export default ProductList;
