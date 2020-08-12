const mongoose = require('mongoose');

const initDB = () => {
  mongoose.connect(process.env.OMNI_ATLAS_CONNECT_STRING,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
};

module.exports.initDB = initDB;
