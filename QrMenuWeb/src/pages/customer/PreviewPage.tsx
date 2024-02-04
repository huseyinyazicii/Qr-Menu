import { useEffect } from 'react';
import Loader from '../../components/shared/Loader';
import { useNavigate } from 'react-router-dom';
import * as CompaniesService from '../../services/companiesService';
import Paths from '../../constants/Paths';

const PreviewPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const getCompany = async () => {
            try {
                const response = await CompaniesService.getCompanyByUser();
                navigate(`/restaurant/${response.data.data?.id}`, {
                    replace: true,
                });
            } catch (error) {
                navigate(Paths.error);
            }
        }

        getCompany();
    }, []);


    return <Loader />;
};

export default PreviewPage;
