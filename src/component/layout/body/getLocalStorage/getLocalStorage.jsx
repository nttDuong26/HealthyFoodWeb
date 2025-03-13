export default function getDataFromLocalStorage (key) {
    try {
        const data = localStorage.getItem(key);
        if (data) {
            // Nếu có dữ liệu trong localStorage, chuyển đổi dữ liệu từ chuỗi JSON thành đối tượng JavaScript và trả về
            return JSON.parse(data);
        }
        // Nếu không có dữ liệu, trả về null hoặc giá trị mặc định khác tùy thuộc vào logic của bạn
        return null;
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi lấy dữ liệu từ localStorage:', error);
        return null; // Hoặc trả về giá trị mặc định khác
    }
};
