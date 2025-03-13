import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
    }

export default function shopCartLink() {
  return (
    <div>
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb" >
                <Link underline="hover"  href="#" sx = {{color: '#fff', paddingLeft: 10}}>
                Trang chủ 
                </Link>
                <Typography sx = {{color: '#d69c52'}}>Giỏ hàng</Typography>
            </Breadcrumbs>
        </div>
    </div>
  )
}
