import { FormEvent, useEffect, useState } from 'react';
import { createProduct, deleteProduct, getProducts, updateProduct } from '@/services/api';
import Product from '@/interface/product';
import Box from '@mui/material/Box'
import { Table, Grid2 as Grid ,TableBody, TableCell, TableRow, Container, Stack, Button, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Add, Delete, Edit, Save } from '@mui/icons-material';
import { productDefault } from '@/forms/default';

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [productForm, setProductForm] = useState(productDefault)
    const [open, setOpen] = useState(false);
    const handleNewProduct = () => {
        setProductForm(productDefault)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleSave = async (e: FormEvent) => {
        e.preventDefault()
        
        if (!productForm.id) {
            const product = await createProduct(productForm)
            setProducts(prev => [...prev, product])
        } else {
            await updateProduct(productForm)
        }
        setOpen(false)
    }
    const handleDelete = (id: number) => {
        setProducts(prev => prev.filter(product => product.id !== id))
        deleteProduct(id)
    }
    const handleEdit = async (product: Product) => {
        setOpen(true)
        setProductForm(product)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductForm({
            ...productForm,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);

    return (
        <Stack spacing={4} alignItems={'center'} justifyContent={'center'}>
            <Typography py={4} variant='h4'>OnTech Full Stack Interview Challenge</Typography>
            <Box>
                <Button startIcon={<Add />} onClick={handleNewProduct} variant="outlined" color="primary">
                    Add Product
                </Button>
            </Box>
            <Container maxWidth='md'>
                <Table>
                    <TableBody>
                        {products.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>
                                    <IconButton color='error' onClick={() => handleDelete(product.id as number)}>
                                        <Delete />
                                    </IconButton>
                                    <IconButton color='primary' onClick={() => handleEdit(product)}>
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-input" aria-describedby="form-description">
                <DialogTitle id="form-input">
                    <Typography>Product</Typography>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSave}>
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Name"
                                    value={productForm.name}
                                    onChange={handleChange}
                                    fullWidth
                                    aria-labelledby="name-label"
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    id="description"
                                    name="description"
                                    label="Description"
                                    value={productForm.description}
                                    onChange={handleChange}
                                    fullWidth
                                    aria-labelledby="description-label"
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    id="price"
                                    name="price"
                                    label="Price"
                                    placeholder="0"
                                    value={productForm.price}
                                    onChange={handleChange}
                                    fullWidth
                                    aria-labelledby="price-label"
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    id="quantity"
                                    name="quantity"
                                    label="Quantity"
                                    placeholder="0"
                                    value={productForm.quantity}
                                    onChange={handleChange}
                                    fullWidth
                                    aria-labelledby="quantity-label"
                                />
                            </Grid>
                        </Grid>
                        <DialogActions sx={{ justifyContent: 'center' }}>
                            <Button type="button" onClick={handleClose} variant="contained" color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" startIcon={<Save />} variant="contained" color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

        </Stack>
    );
}
