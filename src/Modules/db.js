const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/vivek", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

exports.mongoose = mongoose