import React, { useState } from 'react';
import axios from 'axios';

export default function DelProduct({ productId, onDelete }) {
    const [isPrConfirming, setIsPrConfirming] = useState(false);
    const [isPrDeleting, setIsPrDeleting] = useState(false);
    const [deletePrSuccess, setDeletePrSuccess] = useState(false);
  
    // Hàm hiển thị thông báo
    const showAlertPr = () => {
      alert('Xóa sản phẩm thành công');
    };
  
    const handlePrConfirm = () => {
        setIsPrConfirming(true);
    };
  
    const handlePrCancel = () => {
        setIsPrConfirming(false);
    };
  
    const handlePrDelete = async () => {
      try {
        // Thực hiện xóa và chờ cho đến khi hoàn thành
        setIsPrDeleting(true);
        const response = await axios.delete(`http://localhost:3000/v1/Product/${productId}`);
        setIsPrDeleting(false);
        
        // Gọi hàm onDelete truyền từ component cha để cập nhật danh sách người dùng
        onDelete(productId);
        
        if (response.status === 200) {
          // Nếu xóa thành công, hiển thị thông báo
          showAlertPr();
          setDeletePrSuccess(true);
  
        }
      } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        setIsPrDeleting(false);
      }
    };

  return (
    <div>
      {isPrConfirming ? (
        <div>
          <p>Xác nhận xóa sản phẩm {productId.tenSP}?</p>
          <button onClick={handlePrDelete} disabled={isPrDeleting}>Xóa</button>
          <button onClick={handlePrCancel} disabled={isPrDeleting}>Hủy</button>
        </div>
      ) : (
        <button onClick={handlePrConfirm} disabled={isPrDeleting}>Xóa</button>
      )}

      {/* {deleteSuccess && !isDeleting && showAlert()} */}
    </div>
  )
}
