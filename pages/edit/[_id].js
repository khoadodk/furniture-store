import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon
} from 'semantic-ui-react';

import baseUrl from '../../utils/baseUrl';
import catchErrors from '../../utils/catchErrors';

const EditProduct = ({ oldProduct }) => {
  const INITIAL_PRODUCT = {
    name: oldProduct.name,
    description: oldProduct.description,
    price: oldProduct.price,
    media: oldProduct.mediaUrl
  };
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);

  const router = useRouter();
  const _id = router.query;

  useEffect(() => {
    //check to see if the value in every fields of product is true, allow submit
    const isProduct = Object.values(product).every(ele => Boolean(ele));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'media') {
      //update the previous state instead of creating a new object
      setProduct(prevState => ({ ...prevState, media: files[0] }));
      // create a media preview on window
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('file', product.media);
    data.append('upload_preset', 'furniture-store');
    data.append('cloud_name', 'dzb0zeepp');
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url;
    return mediaUrl;
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      setError('');
      const url = `${baseUrl}/api/product/${_id._id}`;
      const mediaUrl = await handleImageUpload();
      // console.log({ mediaUrl });
      const payload = { ...product, mediaUrl };
      const response = await axios.put(url, payload);
      // console.log(response);
      // setProduct(updatedProduct);
      setSuccess(true);
    } catch (err) {
      catchErrors(err, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header as="h2" block>
        <Icon name="edit" color="orange" />
        Edit Product
      </Header>
      <Form
        onSubmit={handleSubmit}
        success={success}
        loading={loading}
        error={Boolean(error)}
      >
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been updated!"
        />
        <Message error header="Oops!" content={error} />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            type="text"
            onChange={handleChange}
            value={product.name}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            type="text"
            min="0.00"
            step="0.01"
            type="number"
            onChange={handleChange}
            value={product.price}
          />
          <Form.Field
            control={Input}
            name="media"
            label="Media"
            content="Select Image"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Image src={product.media} rounded centered size="small" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          type="text"
          onChange={handleChange}
          value={product.description}
        />
        <Form.Field
          control={Button}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
          disabled={disabled || loading}
        />
      </Form>
    </>
  );
};

EditProduct.getInitialProps = async ({ query: { _id } }) => {
  const { data } = await axios.get(`${baseUrl}/api/product/${_id}`);
  return {
    oldProduct: data,
    _id
  };
};

export default EditProduct;
