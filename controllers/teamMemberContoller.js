const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TeamMember = require('../models/teamMemberModle')
const TeamLeader = require('../models/teamLeaderModel');

const createTeamMember = asyncHandler(async (req, res) => {
    const { name, email, phone, password, teamLeaderId } = req.body;

    if (!name || !email || !phone || !password || !teamLeaderId) {
        res.status(400).json({ success: false, message: 'Name, email, phone, password, and team leader ID are required' });
        return;
    }

    const existingTeamMember = await TeamMember.findOne({ email });
    if (existingTeamMember) {
        res.status(400).json({ success: false, message: 'Team member with this email already exists' });
        return;
    }

    const teamLeader = await TeamLeader.findById(teamLeaderId);
    if (!teamLeader) {
        res.status(404).json({ success: false, message: 'Team Leader not found' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teamMember = new TeamMember({
        name,
        email,
        phone,
        password: hashedPassword,
        teamLeaderId
    });

    const savedTeamMember = await teamMember.save();

    teamLeader.teamMembers.push(savedTeamMember._id);
    await teamLeader.save();

    res.status(201).json({ success: true, data: savedTeamMember });
});

const deleteTeamMember = asyncHandler(async (req, res) => {
    const { teamMemberId, teamLeaderId } = req.body;

    if (!teamMemberId || !teamLeaderId) {
        res.status(400).json({ success: false, message: 'Team member ID and team leader ID are required' });
        return;
    }

    const teamMember = await TeamMember.findById(teamMemberId);
    if (!teamMember) {
        res.status(404).json({ success: false, message: 'Team Member not found' });
        return;
    }

    const teamLeader = await TeamLeader.findById(teamLeaderId);
    if (!teamLeader) {
        res.status(404).json({ success: false, message: 'Team Leader not found' });
        return;
    }

    await TeamMember.findByIdAndDelete(teamMemberId);

    teamLeader.teamMembers.pull(teamMemberId);
    await teamLeader.save();

    res.status(200).json({ success: true, message: 'Team Member deleted successfully' });
});

const updateTeamMember = asyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log("id: ", id);
    const data = { ...req.body, updatedAt: Date.now() };
    console.log("data: ", data);
    const teamMember = await TeamMember.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!teamMember) {
        res.status(404).json({ success: false });
        throw new Error('Team Member not found');
    }
    res.status(200).json({ success: true, data: teamMember });
});


module.exports = { createTeamMember, deleteTeamMember, updateTeamMember };
