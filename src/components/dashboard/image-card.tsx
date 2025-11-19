import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchMobilesRequest } from '../../store/mobilesSlice';
import { Box } from '@mui/material';
import { MobileData } from '../../constants';
import { useNavigate } from 'react-router-dom';

export default function ImageCard() {
    const dispatch = useAppDispatch();
    const { data, loading, error } = useAppSelector((state) => state.mobiles);
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(fetchMobilesRequest()); 
    }, [])

    const handleCardClick = (item: MobileData) => {
        console.log(`CardActionArea clicked!: ${JSON.stringify(item)}`);
        navigate('/summary', { state: item })
    };
    return (
    <Box
        sx={{
        display: 'flex',
        flexWrap: 'wrap', // Allows cards to wrap to the next line
        justifyContent: 'center', // Centers the cards horizontally
        gap: 3, // Adds spacing between cards
        p: 2, // Adds padding around the container
        width: '95%',
        margin: 'auto'
        }}
    >
        {data.map ((item: MobileData) =>
            <Card sx={{ width: 400 }}>
                <CardActionArea onClick={() => handleCardClick(item)}>
                    <CardMedia
                    component="img"
                    height="140"
                    image={item.image_url}
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Display: {item.specs.display} <br/>
                        Processor: {item.specs.processor} <br/>
                        Ram: {item.specs.ram} <br/>
                        Storage: {item.specs.storage} <br/>
                        Camera: {item.specs.camera} <br/>
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button size="medium" color="secondary" onClick={() => handleCardClick(item)}>
                        Purchase
                    </Button>
                </CardActions>
        </Card>
        )}
        
    </Box>
  );
}