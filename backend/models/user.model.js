import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['citizen', 'admin', 'worker'], default: 'citizen'},
    address: {type: String},
    phone: {
    type: String,
        validate: {
            validator: function(v) {
                return /^\+91\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        unique: true,
        required: true,
    },
    myComplaints: [{type: mongoose.Schema.Types.ObjectId, ref: 'Complaint'}]
}, {timestamps: true});