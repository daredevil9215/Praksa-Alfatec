const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name must not be empty.'],
    trim: true,
    minlength: [2, 'The name must be longer than 1 character.'],
  },
  barCode: {
    type: String,
    required: [true, 'Bar code must not be empty.'],
    trim: true,
    validate: {
      validator: function(v) {
        return /\w{4}-\w{4}-\w{4}/.test(v);
      },
      message: 'Bar code must be of format ABCD-ABCD-ABCD.'
    }
  },
  color: {
    type: String,
    required: [true, 'Color must not be empty.'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity must not be empty.'],
    trim: true,
    min: [0, 'Quantity cannot be less than zero.'],
  },
  productImageUrl: {
    type: String,
    required: [true, 'Product image URL must not be empty.'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price must not be empty.'],
    trim: true,
    min: [0, 'Price cannot be less than zero.'],
  },
  description: {
    type: String,
    required: [true, 'Description must not be empty.'],
    trim: true,
  }
});

module.exports = mongoose.model('Souvenir', registrationSchema);