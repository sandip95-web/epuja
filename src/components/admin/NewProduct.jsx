import React, { useState, useEffect } from 'react';

import MetaData from '../MetaData';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useGlobalContext } from '../../context/context';
import { newProduct } from '../../actions/productActions';

const NewProduct = () => {
  const navigate = useNavigate();
  const { isError,dispatch, productsuccess } = useGlobalContext();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    'Idols and Statues',
    'Puja Accessories',
    'Incense and Dhoop',
    'Puja Books and Scriptures',
    'Devotional Music and Instruments',
    'Rudraksha Beads and Malas',
    'Clothing and Attire',
    'Festival and Seasonal Decor',
    'Prasad and Offerings',
    'Astrology and Vastu Products',
    'Puja Thalis and Accessories',
    'Devotional Books',
  ];

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
    console.log(productsuccess);
    if (productsuccess) {
      toast.success('Product created successfully');
      navigate('/dashboard');
      dispatch({type:'NEW_PRODUCT_RESET'});
    }
  }, [dispatch,productsuccess,toast, isError]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('price', price);
    formData.set('description', description);
    formData.set('category', category);
    formData.set('stock', stock);
    formData.set('seller', seller);

    images.forEach((image) => {
      formData.append('images', image);
    });

    newProduct(dispatch,formData)
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title={'New Product'} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>

          <div className="col-md-10">
            <form className="shadow-lg p-4" onSubmit={submitHandler} encType="multipart/form-data">
              <h1 className="mb-4">New Product</h1>

              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="name_field" className="form-label">
                    <strong>Name</strong>
                  </label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="price_field" className="form-label">
                   <strong> Price</strong>
                  </label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="description_field" className="form-label">
                    <strong>Description</strong>
                  </label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <label htmlFor="category_field" className="form-label">
                    <strong>Category</strong>
                  </label>
                  <select
                    className="form-select"
                    id="category_field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="stock_field" className="form-label">
                    <strong>Stock</strong>
                  </label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="seller_field" className="form-label">
                    <strong>Seller Name</strong>
                  </label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label"><strong>Images</strong></label>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    
                  </div>
                  {imagesPreview.map((img, index) => (
                    <img key={index} src={img} alt={`Image Preview ${index}`} className="mt-3 mr-2" width="55" height="52" />
                  ))}
                </div>

                <div className="col-12 mt-3">
                  <button type="submit" className="btn btn-primary">
                    CREATE
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
