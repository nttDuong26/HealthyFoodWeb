import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

export default function Links() {

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
        }
  return (
    <div>
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb" >
                <Link underline="hover"  href="#" sx = {{color: '#fff', paddingLeft: 10}}>
                Trang chủ 
                </Link>
                <Typography sx = {{color: '#d69c52'}}>Tất cả món ăn</Typography>
            </Breadcrumbs>
        </div>
    </div>
  )
}
