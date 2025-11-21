import React, { useState, FC } from 'react';
import { IconButton, Typography, Box, Theme } from '@mui/material';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import { SxProps } from '@mui/system';

// Optional: Define an interface for component props if it accepted any
interface ItemCounterProps {
  initialCount?: number;
}

// Define the component using the Function Component (FC) type
const ItemCounter: FC<ItemCounterProps> = ({ initialCount = 0 }) => {
  // TypeScript infers the type of 'count' and 'setCount'
  const [count, setCount] = useState<number>(initialCount);

  // TypeScript infers the event type for onClick
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  // Optional: Define the type for the sx prop explicitly for better type safety
  const numberStyle = {
    minWidth: '12px', // Ensures consistent width for single/double digits
    textAlign: 'center', // Centers the number
    fontWeight: 'bold', // Makes the number stand out
    color: 'primary.main', // Applies the primary theme color
    padding: '0 1px', // Adds slight horizontal padding
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton aria-label="decrement" onClick={handleDecrement} disabled={count === 0}>
        <RemoveCircleSharpIcon />
      </IconButton>

      <Typography variant="body1" component="span" sx={numberStyle}>
        {count}
      </Typography>

      <IconButton aria-label="increment" onClick={handleIncrement}>
        <AddCircleSharpIcon />
      </IconButton>
    </Box>
  );
};

export default ItemCounter;