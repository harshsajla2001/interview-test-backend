const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    teamLeaderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeamLeader',
        required: true
    }
    
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);