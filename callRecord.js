// const mongoose = require('mongoose');

// const callRecordSchema = new mongoose.Schema({
//   callerNumber: { type: String, required: true },
//   receiverNumber: { type: String, required: true },
//   startTime: { type: Date, required: true },
//   endTime: { type: Date, required: true },
//   duration: { type: Number, required: true },
// });

// const CallRecord = mongoose.model('CallRecord', callRecordSchema);

// module.exports = CallRecord;
mongoose.connect('mongodb://localhost:27017/call_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

const mongoose = require('mongoose');

const callRecordSchema = new mongoose.Schema({
  callerNumber: {
    type: String,
    required: true,
  },
  receiverNumber: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('CallRecord', callRecordSchema);

