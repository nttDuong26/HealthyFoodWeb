const User = require('../model/modelUser');
const { Product } = require ('../model/modelProduct');

const CartController = {
    // Add Product to Cart
    addToCart: async (req, res) => {
        try {
            const { userId, productId, quantity } = req.body;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'Người dùng không tồn tại' });
            }

           const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
            }

            // Check if the product is already in the user's cart
            const existingCartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);
            if (existingCartItemIndex !== -1) {
                // If the product is already in the cart, update the quantity
                user.cart[existingCartItemIndex].quantity += quantity;
            } else {
                // If the product is not in the cart, add it to the cart
                user.cart.push({ product: productId, quantity: quantity });
            }

            await user.save();

            res.status(200).json(user.cart);
        } catch (err) {
            res.status(500).json({ error: 'Thêm sản phẩm vào giỏ hàng thất bại', message: err.message });
        }
    },

    // Update Product in Cart
    // updateCart: async (req, res) => {
    //     try {
    //         const { userId, productId, quantity } = req.body;

    //         const user = await User.findById(userId);
    //         if (!user) {
    //             return res.status(404).json({ error: 'Người dùng không tồn tại' });
    //         }

    //         // Check if the product is in the user's cart
    //         const existingCartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);
    //         if (existingCartItemIndex !== -1) {
    //             // If the product is in the cart, update the quantity
    //             user.cart[existingCartItemIndex].quantity = quantity;
    //         } else {
    //             // If the product is not in the cart, return an error
    //             return res.status(404).json({ error: 'Sản phẩm không tồn tại trong giỏ hàng' });
    //         }

    //         await user.save();

    //         res.status(200).json(user.cart);
    //     } catch (err) {
    //         res.status(500).json({ error: 'Cập nhật giỏ hàng thất bại', message: err.message });
    //     }
    // },

  // Get Products in Cart
    getCart: async (req, res) => {
        try {
            // const { userId } = req.body;
            const user = await User.findById(req.params.id).populate('cart.product');
            if (!user) {
                return res.status(404).json({ error: 'Người dùng không tồn tại' });
            }

            const cartItems = user.cart.map(item => ({
                _id: item._id,
                product: item.product,
                quantity: item.quantity,
            }));

            res.status(200).json(cartItems);
        } catch (err) {
            res.status(500).json({ error: 'Lấy thông tin giỏ hàng thất bại', message: err.message });
        }
    },

    decreaseQuantityCart: async (req, res) => {
        try {
            const { cartId } = req.params;
    
            const user = await User.findById(req.params.id).populate('cart.product');
    
            if (!user) {
                return res.status(404).json({ error: 'Người dùng không tồn tại' });
            }
    
            const cartItem = user.cart.find(item => item._id.toString() === cartId);
            if (cartItem) {
                // Giảm số lượng sản phẩm trong giỏ hàng của người dùng
                cartItem.quantity = Math.max(cartItem.quantity - 1, 1);
                await user.save();
    
                const cartItems = user.cart.map(item => ({
                    _id: item._id,
                    product: item.product,
                    quantity: item.quantity,
                }));
                // Trả về thông tin giỏ hàng sau khi giảm số lượng
                res.status(200).json(cartItems);
            } else {
                res.status(404).json({ error: 'Sản phẩm không tồn tại trong giỏ hàng' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi giảm số lượng sản phẩm trong giỏ hàng', message: error.message });
        }
    },    

    increaseQuantityCart: async (req, res) => {
        try {
            const { cartId } = req.params;
    
            const user = await User.findById(req.params.id).populate('cart.product');
    
            if (!user) {
                return res.status(404).json({ error: 'Người dùng không tồn tại' });
            }
    
            const cartItem = user.cart.find(item => item._id.toString() === cartId);
            if (cartItem) {
                // Tăng số lượng sản phẩm trong giỏ hàng của người dùng
                cartItem.quantity++; // Tăng số lượng sản phẩm lên 1 đơn vị
                await user.save();
    
                const cartItems = user.cart.map(item => ({
                    _id: item._id,
                    product: item.product,
                    quantity: item.quantity,
                }));
                // Trả về thông tin giỏ hàng sau khi tăng số lượng
                res.status(200).json(cartItems);
            } else {
                res.status(404).json({ error: 'Sản phẩm không tồn tại trong giỏ hàng' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi tăng số lượng sản phẩm trong giỏ hàng', message: error.message });
        }
    },

    removeItemFromCart: async (req, res) => {
        try {
            const { cartId } = req.params;
    
            const user = await User.findById(req.params.id).populate('cart.product');
    
            if (!user) {
                return res.status(404).json({ error: 'Người dùng không tồn tại' });
            }
    
            const cartItemIndex = user.cart.findIndex(item => item._id.toString() === cartId);
            if (cartItemIndex !== -1) {
                // Xóa sản phẩm khỏi giỏ hàng của người dùng
                user.cart.splice(cartItemIndex, 1);
                await user.save();
    
                const cartItems = user.cart.map(item => ({
                    _id: item._id,
                    product: item.product,
                    quantity: item.quantity,
                }));
                // Trả về thông tin giỏ hàng sau khi xóa sản phẩm
                res.status(200).json(cartItems);
                
            } else {
                res.status(404).json({ error: 'Sản phẩm không tồn tại trong giỏ hàng' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng', message: error.message });
        }
    },
    deleteCart: async (req, res) => {
        const userId = req.params.userId;
    
        try {
            // Xóa giỏ hàng của người dùng dựa trên ID của họ
            await Cart.deleteOne({ user: userId });
    
            res.status(204).json({ message: 'Giỏ hàng đã được xóa thành công.' });
        } catch (error) {
            console.error('Lỗi khi xóa giỏ hàng:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa giỏ hàng.' });
        }
    },
    
};

module.exports = CartController;
