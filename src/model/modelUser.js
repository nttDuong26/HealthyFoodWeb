const mongoose = require('mongoose');
const moment = require('moment');


const UserSchema = new mongoose.Schema({
      tenND: {
        type: String,
        required: true,
      },
      sdt: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (v) {
            return /^[0-9]{1,11}$/.test(v);
          },
          message: "Số điện thoại không hợp lệ",
        },
      },
      matkhau: {
        type: String,
        required: true,
      },

      xacnhanMK: {
          type: String,
          required: true,
      }, 

      profilePic: {
        type: String,
        default: "",
      },

      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },

      cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],

    order: [
      {
          product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Product',
              required: true
          },
          quantityor: {
              type: Number,
              required: true,
              default: 1
          }
      }
  ],
    lastAccessedAt: {
      type: String,
      default:  moment().format('HH:mm, DD/MM/YY'),
    },
    chieucao: {
      type: Number,
    },
    cannang: {
      type: Number,
    },
    tuoi: {
      type: Number,
    },
    gioitinh: {
      type: String,
      enum: ['Nam', 'Nu'],
    },
    nhucau: {
      type: String,
      enum: ['giảm cân', 'giữ cân', 'tăng cân'],
    },
    vandong: {
      type: String,
      enum: ['it', 'vua', 'deu', 'cao', 'sieu'],
    
    }
    
});

const User = mongoose.model('User', UserSchema);

module.exports = User;