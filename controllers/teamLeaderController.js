const asyncHandler = require('express-async-handler');
const TeamLeader = require('../models/teamLeaderModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const createTeamLeader = asyncHandler(async (req, res) => {
    const { name, email, department, password } = req.body;
    if (!name || !email || !department || !password) {
        res.status(400).json({ success: false , message: 'Please add all fields' });
        throw new Error('Please add all fields');
    }
    const teamLeaderExists = await TeamLeader.findOne({ email });
    if (teamLeaderExists) {
        res.status(400).json({ success: false , message: 'Team Leader already exists' });
        throw new Error('Team Leader already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const teamLeader = await TeamLeader.create({
        name,
        email,
        department,
        password: hashedPassword
    });
    if (teamLeader) {
        res.status(200).json({
            success: true,
            data: {
                _id: teamLeader.id,
                name: teamLeader.name,
                email: teamLeader.email,
                department: teamLeader.department,
                password: teamLeader.password
            }
        });
    } else {
        res.status(400).json({ success: false, message: 'Invalid team leader data' });
        throw new Error('Invalid team leader data');
    }
});

const loginTeamLeader = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ success: false, message: 'Please add email and password' });
        throw new Error('Please add email and password');
    }
    const teamLeader = await TeamLeader.findOne({ email });
    if (teamLeader && (await bcrypt.compare(password, teamLeader.password))) {
        const accessToken = jwt.sign({
            id: teamLeader._id
        }, process.env.ACCESS_TOKEN_SECERT, { expiresIn: '5d' });
        res.status(200).json({ success: true, accessToken });
    } else {
        res.status(401).json({ success: false, message: 'Email or password is not valid' });
        throw new Error('Email or password is not valid');
    }
});

const getTeamLeader = asyncHandler(async (req, res) => {
    const userId = req.id.id;
    console.log("userId: ", req.id.id);

    if (!userId) {
        res.status(401).json({ success: false, message: 'Id not found' });
        throw new Error('Id not found');
    }

    const teamLeader = await TeamLeader.findById(userId);
    if (teamLeader) {
        res.status(200).json({
            success: true,
            data: {
                _id: teamLeader.id,
                name: teamLeader.name,
                email: teamLeader.email,
                department: teamLeader.department
            }
        });
    } else {
        res.status(404).json({ success: false, message: 'Team Leader not found' });
        throw new Error('Team Leader not found');
    }

});

const getAllTeamLeader = asyncHandler(async (req, res) => {
    const id = req.body.id;
    console.log("id: ", id);
    console.log("req.body: ", req.body);
    const teamLeader = await TeamLeader.findById(id).populate('teamMembers');
    console.log("teamLeader: ", teamLeader);
    if (!teamLeader) {
        res.status(404).json({ success: false, message: 'Team Leader not found' });
        throw new Error('Team Leader not found');
    }
    res.status(200).json({ success: true, data: teamLeader });
});

module.exports = { createTeamLeader, loginTeamLeader, getTeamLeader, getAllTeamLeader };