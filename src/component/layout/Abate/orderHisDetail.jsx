import React from 'react';
import { Button, Modal } from 'antd';


const OrderHisDetailModal = ({ order, onClose  }) => {
    if (!order) {
        return null;
    }

    const handleExportInvoice = async () => {
        try {
          // Gửi yêu cầu tới API backend để xuất hóa đơn
          const response = await fetch('http://localhost:3000/v1/Order/export-invoice', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order }), // Đảm bảo order đã được định nghĩa trước đó trong phạm vi của hàm này
          });
      
          if (response.ok) {
            // Nhận nội dung hóa đơn và hiển thị nó (ví dụ: mở cửa sổ mới hoặc hiển thị modal)
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'invoice.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            alert('Xuất hóa đơn thành công');

          } else {
            throw new Error('Xuất hóa đơn không thành công');
          }
        } catch (error) {
          console.error(error);
          alert('Đã có lỗi khi xuất hóa đơn');
        }
      };
      
      

    return (
    //   <Modal

    //   title={`Đặt hàng thành công`}
    //   visible={true}
    //   onCancel={onClose}
    //   style={{ top: '6%' }}
    //   bodyStyle={{ overflowY: 'auto',overflowX: 'hidden', maxHeight: 'calc(100vh - 200px)' }}
    //   footer={[
    //     <div>
    //     <Button key="export" onClick={handleExportInvoice}>
    //       Xuất Hóa Đơn
    //     </Button>
    //       <Button className = "modal-content-button1" onClick={onClose}>Đóng</Button>
    //     </div>
       

    //   ]}
    // >
    <div style = {{margin:'2vw'}}>
      <h3 style = {{color: '#776B5D'}}>MÓN ĂN</h3>
          <ul style = {{listStyle: 'none'}}>
            {order.products && order.products.map((product) => (
              
              <li key={product.product._id} style = {{display: 'flex',
              alignItems: 'center'}}>
                <img src={`http://localhost:3000/v1/Image/${product.product?.hinhanh}`} alt="monan-pic" className="Orders-pic" />
                <div style = {{display: 'flex', marginLeft: '1vw'}}>
                {product.product.tenSP} <br/>  {product.product.giaSP}.000đ  <br/>   Số Lượng: x{product.quantity}
                </div>
              </li>
            ))}
          </ul >
          <h3 style = {{color: '#776B5D'}} >ĐƠN HÀNG #{order._id}</h3>
          <ul style = {{listStyle: 'none', margin: '0'}} >
          <li> VAT: 0% </li>
          <li>Trạng thái: {order.status}</li>
          </ul>
          <h3  style = {{color: '#776B5D'}} >NGÀY ĐẶT HÀNG:  </h3>
          <ul style = {{listStyle: 'none', margin: '0'}} >
          <li>{order.createdAt}</li>
          </ul>
          <h3  style = {{color: '#776B5D'}}>VẬN CHUYỂN ĐẾN:</h3>
          <ul style = {{listStyle: 'none', margin: '0'}} >
          <li> {order.shippingAddress}</li>
          </ul>
          <h3  style = {{color: '#776B5D'}}>PHƯƠNG THỨC THANH TOÁN: </h3>
          <ul style = {{listStyle: 'none', margin: '0'}} >
          <li> {order.paymentMethod}</li>
          </ul>
          <h3  style = {{color: '#776B5D'}}>TÓM TẮT:  </h3>
          <ul style = {{listStyle: 'none', margin: '0'}} >
          <li> Tổng tiền: {order.totalPrice}.000đ</li>
          <li> Ghi chú:  {order.ghichu ? order.ghichu : "Không có ghi chú"}</li>
          </ul>

          
          {/* <button className="modal-content-button1" onClick={handleExportInvoice}>
            Xuất Hóa Đơn
          </button>
          <button className = "modal-content-button1" onClick={onClose}>Đóng</button>
        </div> */}
      {/* </div> */}
      
      </div>

    );
};

export default OrderHisDetailModal;
