import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ResponsiveAppHeaderBar from '../header/ResponsiveAppHeaderBar';
import Footer from '../footer/footer';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ItemCounter from './item-counter';
import { MobileData } from '../../constants';
import { deleteCartItems } from '../../store/cartSlice';
import DeleteIcon from '@mui/icons-material/Delete';

const CartSummary = () => {
    const { cartData } = useAppSelector((state) => state.carts);
    const dispatch = useAppDispatch();
    const deleteCartItem = (item: MobileData) => {
        dispatch(deleteCartItems(item))
    }
    return (
        <div className='App'>
            <ResponsiveAppHeaderBar/>
            <div  style={{maxWidth: "90%", margin: 'auto', padding: '25px 0px 25px 0px', minHeight: '575px'}}>
                <h2 style={{color: 'green'}}> Cart Summary </h2>
                {cartData.map((item) => (
                    <Accordion defaultExpanded>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Box
                                component="img"
                                src={item.image_url} // Replace with your image URL
                                alt="Small image"
                                sx={{
                                width: 80,
                                height: 80,
                                marginRight: 2, // Spacing between image and text
                                }}
                            />
                            <Typography sx={{ flexGrow: 1 }}>
                                <div>{item.brand} - {item.name} - {item.specs.display} ({item.specs.processor})</div>
                                <div style={{fontWeight: 'bold', fontSize: '25px', textAlign: 'left'}}>&#8377;{item.offer_price.toFixed(2)}</div>
                            </Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div><ItemCounter/></div>
                    </AccordionDetails>
                    <AccordionActions>
                        <Button variant='contained' color='secondary' onClick={() => deleteCartItem(item)} startIcon={<DeleteIcon/>}>Delete</Button>
                        <Button>Save for later</Button>
                    </AccordionActions>
                </Accordion>
                ))}
            </div>
            <Footer/>
        </div>
        
    )
}

export default CartSummary