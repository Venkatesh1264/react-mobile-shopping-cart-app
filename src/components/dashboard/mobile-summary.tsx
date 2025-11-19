import React, { useState, useEffect } from 'react';
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Stack from '@mui/material/Stack';


function MobileSummary() {
  const location = useLocation();
  const data: MobileData = location.state;
  const [isZooming, setIsZooming] = useState<boolean>(false);
  const [backgroundPosition, setBackgroundPosition] = useState<string>('0% 0%');
  const [activeImageSrc, setActiveImageSrc] = useState<string>(data?.image_url);

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
    setActiveImageSrc(data?.summaryImages[index]);
  };

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
                  {data?.summaryImages.map((item: string) => (
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
                    <div style={{fontWeight: 'bold'}}>{data.brand} - {data.name} - {data.specs.display} ({data.specs.processor})</div>
                    <div className='rating'>
                      <span style={{ border: '0px solid', borderRadius: '30%', backgroundColor: '#00A300', padding: '5px', fontWeight: 'bold'}}>{data.rating}</span>
                      <Rating name="user-rating"
                      value={data.rating}
                      readOnly precision={0.5} size='medium'/>
                    </div>
                    <div style={{fontWeight: 'bold', padding: '25px 0px', fontSize: '25px'}}>
                      &#8377;{data.price_usd.toFixed(2)}
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
                        <li><b>Processor: </b>{data.specs.processor} </li>
                        <li><b>Display: </b>{data.specs.display} </li>
                        <li><b>RAM: </b>{data.specs.ram} </li>
                        <li><b>ROM: </b>{data.specs.storage.join(' | ')} </li>
                        <li><b>Camera: </b>{data.specs.camera} </li>
                      </ul>
                    </div>
                    <div className='payment-options'>
                      <div style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '15px'}}>Payment Options:</div>
                       <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="full_amount"
                          name="radio-buttons-group"
                          style={{paddingTop: '10px', paddingLeft: '5rem'}}
                        >
                          <FormControlLabel value="full_amount" control={<Radio size='small' />} label="Pay Full Amount" />
                          <FormControlLabel value="partial_amount" control={<Radio size='small'/>} label="Pay Partial Amount (Rs. 200) + Remaining amount at the time of delivery" />
                        </RadioGroup>
                    </div>
                    <div className='cart-button-group'>
                      <Stack spacing={2} direction="row" style={{justifyContent: 'center'}}>
                        <Button sx={{ textTransform: 'none' }} variant="outlined" color="secondary" startIcon={<ShoppingCartIcon/>}>
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
      <Footer/>
    </div>
  );
}

export default MobileSummary;