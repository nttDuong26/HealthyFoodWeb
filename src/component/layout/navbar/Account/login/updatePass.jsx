
import React, { useState } from 'react';

const ChangePassword = ({ onUpdatePassword }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleUpdatePassword = () => {
    // Thực hiện kiểm tra và cập nhật mật khẩu
    if (newPassword === confirmPassword) {
      onUpdatePassword(newPassword);
    } else {
      alert('Mật khẩu mới và xác nhận mật khẩu không trùng khớp');
    }
  };

  return (
    <div>
      <label>Mật khẩu mới:</label>
      <input type="password" value={newPassword} onChange={handlePasswordChange} />
      <br />
      <label>Xác nhận mật khẩu mới:</label>
      <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      <br />
      <button onClick={handleUpdatePassword}>Cập nhật mật khẩu</button>
    </div>
  );
};

export default ChangePassword;
