const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeProfileImageUrl: 'String',
  employeeName: String,
  designation: String,
  employeeId: String,
  dateOfBirth: Date,
  email: String,
  contactNumber: Number,
  address: String,
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
