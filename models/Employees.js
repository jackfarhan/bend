const mongoose  = require('mongoose')
const EmployeesSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
    },
    email :{
        type:String,
        required:true,
    },
    mobile :{
        type:String,
        required:true,
    },
    designation :{
        type:String,
        enum:['HR','Manager','sales'],
        required:true,
    },
    gender :{
        type:String,
        enum:['Male', 'Female'],
        required:true,
    },
    course :{
        type:String,
        enum:['MCA', 'BCA','BSC'],
        required:true,
    },
    img :{
        type:String,
        required:true,
    },
},
{timestamps : true}
)

module.exports = mongoose.model('Employee', EmployeesSchema)