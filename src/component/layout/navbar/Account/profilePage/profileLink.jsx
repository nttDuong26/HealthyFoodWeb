import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import './profilePage.css';
import { Link as RouterLink } from 'react-router-dom';


function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
    }

export default function ProfileLinks() {
  return (
    <div>
      <div role="presentation" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb" >
                    <Link 
                        component={RouterLink}
                        to="/body"
                        underline="hover"  
                        sx = {{color: '#fff', paddingLeft: 10}}>
                        Trang chủ 
                    </Link>
                    <Typography sx = {{color: '#d69c52'}}>Trang cá nhân</Typography>
                    {/* <Typography sx = {{color: '#d69c52'}}>Chi tiết món ăn</Typography> */}
                </Breadcrumbs>
            </div>
    </div>
  )
}
