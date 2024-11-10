const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 
const Employee = require('../models/Employees'); 
const upload = require('../config/multerConfig')


router.post('/', auth, upload.single('img'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;
    const img = req.file ? req.file.path : null;

    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      img,
    });

    const employee = await newEmployee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

router.put('/:id', auth, upload.single('img'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;
    const img = req.file ? req.file.path : undefined;

    const updatedData = { name, email, mobile, designation, gender, course };
    if (img) updatedData.img = img;

    const employee = await Employee.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const employees = await Employee.find();
     return res.status(200).json(employees);
  } catch (err) {
     return res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/name/:name', auth, async (req, res) => {
  try {
    const employee = await Employee.find({name:req.params.name});
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });
    return res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/id/:id', auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });
   const data= res.json(employee);
   console.log(data);
   

  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});



router.delete('/:id', auth, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });
    return res.json({ msg: 'Employee deleted' });
  } catch (err) {
    return res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
