import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router';
import type { MenuItem } from '../types/menu';

export default function CardItem({ text, icon, path }: MenuItem) {
  const navigate = useNavigate();

  return (
    <Card sx={{ 
      width: 200, 
      margin: 2,
      boxShadow: 6,
      transition: '0.3s',
      '&:hover': {                   
      boxShadow: 6,
      transform: 'scale(1.03)', }
      }}>
      <CardActionArea onClick={() => navigate(path)}>
        <CardContent sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
        }}>
          {icon}
          <Typography variant="h6" sx={{ mt: 1 }}>
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}