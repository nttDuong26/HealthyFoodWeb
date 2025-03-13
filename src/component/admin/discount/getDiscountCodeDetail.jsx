import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Image } from 'antd';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';


export default function DiscountCodeDetail({ id, closeGetDCModal }) {
    const [code, setCode] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [startDate, setstartDate] = useState('');
  const [discountCodeDetailDetail, setDiscountCodeDetail] = useState(null);

  
  
    useEffect(() => {
      // Gọi API endpoint để lấy thông tin mã giảm giá dựa trên id khi component được tạo ra
      const fetchDiscountCode = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/v1/DiscountCode/discount-code/${id}`);
          const { code, discountPercentage, expirationDate, startDate } = response.data;
          // Cập nhật state variables với thông tin mã giảm giá từ API
          setCode(code);
          setDiscountPercentage(discountPercentage);
          setExpirationDate(expirationDate);
          setDiscountCodeDetail(response.data);
          setstartDate(startDate);
        } catch (error) {
          console.error('Lỗi khi lấy thông tin mã giảm giá:', error);
        }
      };
  
      // Gọi hàm fetchDiscountCode khi component được tạo ra
      fetchDiscountCode();
    }, [id,closeGetDCModal  ]); // Thực hiện lại khi id thay đổi
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên mã giảm</TableCell>
            <TableCell>Phần trăm</TableCell>
            <TableCell>Ngày bắt đầu giảm giá</TableCell>
            <TableCell>Ngày kết thúc giảm giá</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{discountCodeDetailDetail?.code}</TableCell>
            <TableCell>{discountCodeDetailDetail?.discountPercentage}%</TableCell>
            <TableCell>{discountCodeDetailDetail?.startDate}</TableCell>
            <TableCell>{discountCodeDetailDetail?.expirationDate}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
