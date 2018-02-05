const mongoose = require('mongoose');

const QueryRecordSchema = new mongoose.Schema({
  term: String,
  time: Date,
  results: Number
});

const QueryRecord = mongoose.model('QueryRecord', QueryRecordSchema);

module.exports = QueryRecord;
