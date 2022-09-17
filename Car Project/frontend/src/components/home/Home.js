import Banner from "../banner/Banner";
import Categories from "./Categories";
import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom'; 

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;

const Home =()=>{
    return(
        <>
        

        <Banner />
        <Link to = '/create'>
        <StyledButton variant="contained">Create Blog</StyledButton>
        </Link>
        {/* <Categories/> */}
        </>
    )
}

export default Home;