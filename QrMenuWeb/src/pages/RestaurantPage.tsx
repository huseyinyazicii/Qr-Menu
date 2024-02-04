import { CSSProperties, useEffect, useState } from 'react';
import { Box, CardMedia, Typography } from '@mui/material';
import { Colors, useCustomTheme } from '../contexts/ThemeContext';
import ModeToggle from '../components/shared/ModeToggle';
import { useParams } from 'react-router-dom';
import ListCategoriesByUserIdResponse from '../services/categoriesService/responseModels/ListCategoriesByUserIdResponse';
import * as CategoriesService from '../services/categoriesService';
import * as CompaniesService from '../services/companiesService';
import * as Messages from '../utils/messages';
import Loader from '../components/shared/Loader';

const storageUrl = import.meta.env.VITE_STORAGE_URL;

const RestaurantPage = () => {

    const { mode } = useCustomTheme();
    const params = useParams();

    const [categories, setCategories] = useState<ListCategoriesByUserIdResponse[]>([]);
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(false);

    const styles = {
        image: {
            height: '80px',
            width: '80px',
            borderRadius: '50%',
            objectFit: 'cover',
        } as CSSProperties,
        content: {
            whiteSpace: 'nowrap', 
            textOverflow: 'ellipsis', 
            overflow: 'hidden',
            fontSize:'14px',
        }
    };

    useEffect(() => {
        const listCategories = async () => {
            setLoading(true);
            try {
                const response = await CategoriesService.listCategoriesByCompanyId(params.id || '');
                setCategories(response.data.data ?? []);
                const responseCompany = await CompaniesService.getCompanyName(params.id || '');
                setCompanyName(responseCompany.data.data || '');
            } catch (error) {
                Messages.errorMessage('Ürünler listelenemedi');
            }
            setLoading(false);
        };

        listCategories();
    }, []);


    return (
        <Box>
            {loading && <Loader />}
            <Box bgcolor={mode==='dark' ? Colors.grey[700] : 'white'} padding='8px 12px'>
                <Box display='flex' justifyContent='space-between' alignItems='center' maxWidth={816} m='auto'>
                    <Typography fontSize='20px' fontWeight='600' textTransform='capitalize'>{companyName}</Typography>
                    <ModeToggle />
                </Box>
            </Box>
            <Box display='flex' justifyContent='center' flexDirection='column' maxWidth={856} m='auto' position='relative'>
                {categories.map(category => category.products.length > 0 && (
                    <Box key={category.id} padding='0px 12px'>
                        <Box display='flex' flexDirection='column' alignItems='center'>
                            <Typography mt='12px' fontSize='18px' fontWeight='600'  textTransform='capitalize' component='h3'>
                                {category.name}
                            </Typography>
                            <Box 
                                style={{
                                    height: '6px',
                                    width: '80px',
                                    backgroundColor: Colors.blueAccent[500],
                                    marginTop: '2px',
                                    marginBottom: '16px',
                                    borderRadius: '8px',
                                }}
                            />
                        </Box>
                        
                        <Box display='flex' justifyContent='center' flexWrap='wrap' gap='16px' mb='32px' >
                            {category.products.map(product => (
                                <Box key={product.id} display='flex' alignItems='center' width='100%' maxWidth='400px' bgcolor={mode === 'dark' ? Colors.grey[700] : 'white'} p='16px' borderRadius='16px'>
                                    {product.imagePath ? (
                                        <CardMedia
                                            component='img'
                                            style={styles.image}
                                            image={`${storageUrl}${product.imagePath}`}
                                        />
                                    ) : (
                                        <Box sx={{...styles.image, backgroundColor: Colors.blueAccent[500]}} />
                                    )}
                                    <Box ml='8px' flex='1' maxWidth='calc(100% - 88px)'>
                                        <Box display='flex' justifyContent='space-between' mb='8px'>
                                            <Typography component='h3' fontWeight={700}>
                                                {product.title}
                                            </Typography>
                                            <Typography component='h6' fontWeight={500} color={Colors.blueAccent[500]}>
                                                {`${product.price} ₺`}
                                            </Typography>
                                        </Box>
                                        <Typography fontSize='14px' style={styles.content}>{product.content}</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default RestaurantPage;
