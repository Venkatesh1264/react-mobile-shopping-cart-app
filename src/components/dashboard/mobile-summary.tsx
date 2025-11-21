import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ResponsiveAppHeaderBar from '../header/ResponsiveAppHeaderBar'
import Footer from '../footer/footer';
import { useLocation } from 'react-router-dom';
import '../../static/css/App.css'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { MobileData } from '../../constants';
import Rating from '@mui/material/Rating';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateCartItems } from '../../store/cartSlice';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

interface State extends SnackbarOrigin {
  open: boolean;
}

function MobileSummary() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const mobileData: MobileData = location.state;
  const [isZooming, setIsZooming] = useState<boolean>(false);
  const [backgroundPosition, setBackgroundPosition] = useState<string>('0% 0%');
  const [activeImageSrc, setActiveImageSrc] = useState<string>(mobileData?.image_url);
  const { cartData } = useAppSelector((state) => state.carts);
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  });
  const { vertical, horizontal, open } = state;
  const [ snickMessage, setSnickMessage ] = useState<string>('')


  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (!target) return;

    const { left, top, width, height } = target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setBackgroundPosition(`${x}% ${y}%`);
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  // Update the active image source when the carousel slide changes
  const handleCarouselChange = (index: number) => {
    setActiveImageSrc(mobileData?.summaryImages[index]);
  };

  const calculateOfferPercentage = (oldPrice: number, newPrice: number) => {
      return ((oldPrice - newPrice)/oldPrice) * 100
  }
  const handleClick = (newState: SnackbarOrigin) => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  
  const addToCart = (item: MobileData) => {
    if(cartData == null || cartData.length == 0) {
      dispatch(updateCartItems(item))
      handleClick({ vertical, horizontal } as SnackbarOrigin)
      setSnickMessage('Added the item to cart')
    } else if(!cartData.find( data => data.id == item.id)) {
      dispatch(updateCartItems(item))
      handleClick({ vertical, horizontal } as SnackbarOrigin)
      setSnickMessage('Added the item to cart')
    } else if(cartData.find( data => data.id == item.id)){
      handleClick({ vertical, horizontal } as SnackbarOrigin)
      setSnickMessage('Item already present in cart')
    }
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        Close
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="App">
      <ResponsiveAppHeaderBar/>
        <div className="container-grid">
            <div className="panel-one" style={{ padding: '20px', textAlign: 'left', fontWeight: 'bold' }}>
                <Carousel
                  showArrows={true}
                  infiniteLoop={true}
                  useKeyboardArrows={true}
                  autoPlay={false} // Autoplay might interfere with manual zoom interaction
                  statusFormatter={(current, total) => `Slide ${current} of ${total}`}
                  showThumbs={true}
                  dynamicHeight={false}
                  onChange={handleCarouselChange} // Add onChange handler
                >
                  {mobileData?.summaryImages.map((item: string) => (
                    <div key={item} className="carousel-item-wrapper" onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}>
                      {/* Attach mouse events to the image itself for more precise targeting */}
                      <img
                        src={item}
                        alt={''}
                        className="carousel-image"
                      />
                    </div>
                  ))}
                </Carousel>
            </div>
            <div className="panel-two">
                {/* The new dedicated zoom panel */}
                <div 
                    className="zoom-panel"
                    style={{
                        // Use background properties to enable the zoom effect
                        backgroundImage: `url(${activeImageSrc})`,
                        backgroundPosition: backgroundPosition,
                        backgroundSize: isZooming ? '200%' : '100%', // Adjust zoom level (e.g., 250%)
                        opacity: isZooming ? 1 : 0, // Fade in/out the panel
                    }}
                    hidden={!isZooming}
                >
                </div>
                <div hidden={isZooming} style={{ padding: '20px', textAlign: 'left' }}>
                    <div style={{fontWeight: 'bold'}}>{mobileData.brand} - {mobileData.name} - {mobileData.specs.display} ({mobileData.specs.processor})</div>
                    <div className='rating'>
                      <span style={{ border: '0px solid', borderRadius: '30%', backgroundColor: '#00A300', padding: '5px 7px', fontWeight: 'bold'}}>{mobileData.rating}</span>
                      <Rating name="user-rating"
                      value={mobileData.rating}
                      readOnly precision={0.5} size='medium'/>
                    </div>
                    <div style={{padding: '5px 0px 25px 0px'}}>
                      <span style={{fontWeight: 'bold', padding: '25px 0px', fontSize: '25px'}}>&#8377;{mobileData.offer_price.toFixed(2)}</span>
                      <span style={{textDecoration: 'line-through', fontSize: '15px', fontWeight: '300', marginLeft: '10px', textAlign: 'center'}}>&#8377;{mobileData.old_price.toFixed(2)}</span>
                      <span style={{fontSize: '15px', fontWeight: '600', marginLeft: '10px', textAlign: 'center', color: 'green'}}>{calculateOfferPercentage(mobileData.old_price, mobileData.offer_price).toFixed(2)}% off</span>
                    </div>
                    <div className="available-offers">
                      <div style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '15px'}}>Available offers:</div>
                      <ul style={{fontSize: '13px', lineHeight: '25px'}}>
                        <li><b>Bank Offer</b> 5% cashback on Axis Bank Flipkart Debit Card up to ₹750 <a href='#' style={{fontWeight: 'bold',textDecoration: 'none', color: '#134ebdff'}}>T&C</a></li>
                        <li><b>Bank Offer</b> 5% cashback on Flipkart SBI Credit Card upto ₹4,000 per calendar quarter <a href='#' style={{fontWeight: 'bold',textDecoration: 'none', color: '#134ebdff'}}>T&C</a></li>
                        <li><b>Bank Offer</b> 10% off up to ₹1,000 on PNB Credit Card Transactions, on orders of ₹5,000 and above <a href='#' style={{fontWeight: 'bold',textDecoration: 'none', color: '#134ebdff'}}>T&C</a></li>
                      </ul>
                    </div>

                    <div className="highlights">
                      <div style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '15px'}}>Highlights:</div>
                      <ul style={{fontSize: '13px', lineHeight: '25px'}}>
                        <li><b>Processor: </b>{mobileData.specs.processor} </li>
                        <li><b>Display: </b>{mobileData.specs.display} </li>
                        <li><b>RAM: </b>{mobileData.specs.ram} </li>
                        <li><b>ROM: </b>{mobileData.specs.storage.join(' | ')} </li>
                        <li><b>Camera: </b>{mobileData.specs.camera} </li>
                      </ul>
                    </div>
                    <div className='payment-options'>
                      <div style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '15px'}}>Payment Options:</div>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container rowSpacing={2} columnSpacing={1} textAlign='left' alignItems={'center'}>
                          <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue="full_amount"
                              name="radio-buttons-group"
                              style={{paddingTop: '10px', alignItems: 'center', textAlign: 'left'}}
                            >
                              <Grid size={12} marginBottom={'10px'} fontSize={'10px'}>
                                <Item><FormControlLabel value="full_amount" control={<Radio size='small' />} label="Pay Full Amount" /></Item>
                              </Grid>
                              <Grid size={12}>
                                <Item><FormControlLabel value="partial_amount" control={<Radio size='small'/>} label="Pay Partial Amount (Rs. 200) + Remaining amount at the time of delivery" /></Item>
                              </Grid>
                            </RadioGroup>
                          </Grid>
                        </Box>
                    </div>
                    <div className='cart-button-group'>
                      <Stack spacing={2} direction="row" style={{justifyContent: 'center'}}>
                        <Button sx={{ textTransform: 'none' }} variant="outlined" color="secondary" startIcon={<AddShoppingCartIcon/>} onClick={() => addToCart(mobileData)}>
                          Add to cart
                        </Button>
                        <Button sx={{ textTransform: 'none' }} variant="contained" color="primary" startIcon={<SendIcon/>}>
                          Buy Now
                        </Button>
                      </Stack>
                    </div>
                </div>
            </div>
        </div>
        <Box sx={{ width: 500 }}>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={3000}
            open={open}
            onClose={handleClose}
            message={snickMessage}
            key={vertical + horizontal}
            action={action}
          />
        </Box>
      <Footer/>
    </div>
  );
}

export default MobileSummary;