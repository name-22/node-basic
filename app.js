const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/call_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(error => console.error('Error connecting to MongoDB:', error.message));

const CallRecord = mongoose.model('CallRecord', {
  callerNumber: String,
  receiverNumber: String,
  startTime: Date,
  endTime: Date,
  duration: Number,
});

app.get('/call-records', async (req, res) => {
  try {
    const callRecords = await CallRecord.find();
    res.json(callRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/call-records/:id', async (req, res) => {
  try {
    const callRecord = await CallRecord.findById(req.params.id);
    if (!callRecord) {
      return res.status(404).json({ message: 'Call record not found' });
    }
    res.json(callRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/call-records', async (req, res) => {
  try {
    const newCallRecord = await CallRecord.create(req.body);
    res.status(201).json(newCallRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/call-records/:id', async (req, res) => {
  try {
    const updatedCallRecord = await CallRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCallRecord) {
      return res.status(404).json({ message: 'Call record not found' });
    }
    res.json(updatedCallRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/call-records/:id', async (req, res) => {
  try {
    const deletedCallRecord = await CallRecord.findByIdAndRemove(req.params.id);
    if (!deletedCallRecord) {
      return res.status(404).json({ message: 'Call record not found' });
    }
    res.json({ message: 'Call record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.delete('/call-records/:id', async (req, res) => {
  try {
    const deletedCallRecord = await CallRecord.findByIdAndRemove(req.params.id);
    if (!deletedCallRecord) {
      return res.status(404).json({ message: 'Call record not found' });
    }
    res.json({ message: 'Call record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
