const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const { createTeamMember, deleteTeamMember, updateTeamMember, getTeamMember } = require("../controllers/teamMemberContoller.js");

router.post('/register', createTeamMember);
router.delete('/delete', validateToken, deleteTeamMember);
router.patch('/update/:id', validateToken, updateTeamMember);

module.exports = router;