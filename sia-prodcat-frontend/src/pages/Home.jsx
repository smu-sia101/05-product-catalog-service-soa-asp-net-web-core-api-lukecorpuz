import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import Sidebar from "./Sidebar";
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    imageUrl: ''
  });

  const navigate = useNavigate();

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setEditMode(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
    setEditMode(false);
  };

  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => {
    setAddModalOpen(false);
    setNewProduct({
      name: '',
      description: '',
      category: '',
      price: '',
      stock: '',
      imageUrl: ''
    });
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://localhost:7192/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7192/api/products/${id}`);
      fetchProducts();
      handleClose();
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`https://localhost:7192/api/products/${selectedProduct.id}`, selectedProduct);
      fetchProducts();
      handleClose();
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      await axios.post('https://localhost:7192/api/products', {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
      });
      fetchProducts();
      handleAddModalClose();
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home-main">
      <Sidebar />
      <div className="home-prod">
        <h1>Product Catalog</h1>
        <Button variant="contained" color="primary" onClick={handleAddModalOpen} sx={{ mb: 2 }}>
          Add Product
        </Button>

        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => handleOpen(product)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.imageUrl || "https://via.placeholder.com/150"}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {product.description}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      PHP {product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 2ND MODAL FOR VIEW, DELETE, EDIT*/}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{ backdrop: { timeout: 500 } }}
        >
          <Fade in={open}>
            <Box sx={style}>
              {selectedProduct && (
                <>
                  <Typography variant="h6">
                    {editMode ? 'Edit Product' : selectedProduct.name}
                  </Typography>
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="modal-img"
                    style={{ width: '100%', marginTop: 10 }}
                  />

                  {editMode ? (
                    <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <input name="name" value={selectedProduct.name} onChange={handleChange} placeholder="Name" />
                      <input name="description" value={selectedProduct.description} onChange={handleChange} placeholder="Description" />
                      <input name="category" value={selectedProduct.category} onChange={handleChange} placeholder="Category" />
                      <input name="price" value={selectedProduct.price} onChange={handleChange} placeholder="Price" type="number" />
                      <input name="stock" value={selectedProduct.stock} onChange={handleChange} placeholder="Stock" type="number" />
                      <input name="imageUrl" value={selectedProduct.imageUrl} onChange={handleChange} placeholder="Image URL" />
                    </div>
                  ) : (
                    <Typography sx={{ mt: 2 }}>
                      <strong>ID:</strong> {selectedProduct.id}<br />
                      <strong>Description:</strong> {selectedProduct.description}<br />
                      <strong>Category:</strong> {selectedProduct.category}<br />
                      <strong>Price:</strong> PHP {selectedProduct.price}<br />
                      <strong>Stock:</strong> {selectedProduct.stock}
                    </Typography>
                  )}

                  <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(selectedProduct.id)}>Delete</Button>
                    {editMode ? (
                      <Button variant="contained" color="success" onClick={handleEditSave}>Save</Button>
                    ) : (
                      <Button variant="contained" onClick={() => setEditMode(true)}>Edit</Button>
                    )}
                  </div>
                </>
              )}
            </Box>
          </Fade>
        </Modal>

{/* ADD PRODUCT MODAL */}
<Modal
  aria-labelledby="add-product-modal-title"
  open={addModalOpen}
  onClose={handleAddModalClose}
  closeAfterTransition
  slots={{ backdrop: Backdrop }}
  slotProps={{ backdrop: { timeout: 500 } }}
>
  <Fade in={addModalOpen}>
    <Box sx={{ ...style, maxWidth: 500, margin: 'auto' }}>
      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add New Product
        </Typography>
        <form onSubmit={handleAddProduct}>
          <TextField
            label="Product ID"
            name="id"
            fullWidth
            value={newProduct.id}
            onChange={handleNewChange}
            required
            margin="normal"
          />
          <TextField
            label="Product Name"
            name="name"
            fullWidth
            value={newProduct.name}
            onChange={handleNewChange}
            required
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={newProduct.description}
            onChange={handleNewChange}
            required
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            fullWidth
            value={newProduct.category}
            onChange={handleNewChange}
            required
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            fullWidth
            value={newProduct.price}
            onChange={handleNewChange}
            required
            margin="normal"
          />
          <TextField
            label="Stock Quantity"
            name="stock"
            fullWidth
            value={newProduct.stock}
            onChange={handleNewChange}
            required
            margin="normal"
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            fullWidth
            value={newProduct.imageUrl}
            onChange={handleNewChange}
            required
            margin="normal"
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button variant="outlined" onClick={handleAddModalClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  </Fade>
</Modal>
      </div>
    </div>
  );
};

export default Home;
