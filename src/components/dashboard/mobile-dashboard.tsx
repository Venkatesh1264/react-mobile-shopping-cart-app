import ResponsiveAppHeaderBar from '../header/ResponsiveAppHeaderBar'
import CarouselComponent from './carousel';
import Footer from '../footer/footer';
import MyCardList from './image-card';
import Divider from '@mui/material/Divider';

function MobileDashboard() {
  return (
    <div className="App">
      <ResponsiveAppHeaderBar/>
      <CarouselComponent/>
      <Divider style={{margin: 'auto', width: "90%", paddingTop: '1px', paddingBottom: '40px'}}/>
      <MyCardList/>
      <Footer/>
    </div>
  );
}

export default MobileDashboard;
