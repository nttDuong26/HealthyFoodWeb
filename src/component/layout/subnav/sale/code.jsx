import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Modal, Button } from '@mui/material';
import './sale.css';
import CopyToClipboard from 'react-copy-to-clipboard';


export default function GetCode({ visible, onCancel }) {
  const [discountCodes, setDiscountCodes] = useState([]);
const [copied, setCopied] = useState(false);
  useEffect(() => {
    const fetchDiscountCodes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/DiscountCode/discount-codes');
        const fetchedDiscountCodes = response.data;
        setDiscountCodes(fetchedDiscountCodes);
        onCancel();
      } catch (error) {
        console.error('Lỗi khi lấy thông tin mã giảm giá:', error);
      }
    };

    fetchDiscountCodes();
  }, [visible, onCancel]);

  const columns = [
  
    { id: 'code', label: 'Mã giảm', minWidth: 100 },
    { id: 'discountPercentage', label: 'Phần trăm', minWidth: 100, format: (value) => `${value}%` },
    { id: 'startDate', label: 'Ngày bắt đầu', minWidth: 150 },

    { id: 'expirationDate', label: 'Ngày kết thúc', minWidth: 150 },

  ];

  return (
    <div>
      <h2>Danh sách khuyến mãi</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {discountCodes.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align="left">
                    {column.format ? column.format(row[column.id]) : row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
