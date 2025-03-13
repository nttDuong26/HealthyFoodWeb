import React, { useState } from 'react';
import axios from 'axios';

export default function DeleteUser({ userId, onDelete }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Hàm hiển thị thông báo
  const showAlert = () => {
    alert('Xóa người dùng thành công');
  };

  const handleConfirm = () => {
    setIsConfirming(true);
  };

  const handleCancel = () => {
    setIsConfirming(false);
  };

  const handleDelete = async () => {
    try {
      // Thực hiện xóa và chờ cho đến khi hoàn thành
      setIsDeleting(true);
      const response = await axios.delete(`http://localhost:3000/v1/User/deleteuser/${userId}`);
      setIsDeleting(false);
      
      // Gọi hàm onDelete truyền từ component cha để cập nhật danh sách người dùng
      onDelete(userId);
      
      if (response.status === 201) {
        // Nếu xóa thành công, hiển thị thông báo
        showAlert();
        setDeleteSuccess(true);

      }
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error);
      setIsDeleting(false);
    }
  };

  return (
    <div>
      {isConfirming ? (
        <div>
          <p>Xác nhận xóa người dùng {userId.tenND}?</p>
          <button onClick={handleDelete} disabled={isDeleting}>Xóa</button>
          <button onClick={handleCancel} disabled={isDeleting}>Hủy</button>
        </div>
      ) : (
        <button onClick={handleConfirm} disabled={isDeleting}>Xóa</button>
      )}

      {/* {deleteSuccess && !isDeleting && showAlert()} */}
    </div>
  );
}
