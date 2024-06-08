const express = require("express");
const { createTeamLeader, loginTeamLeader, getTeamLeader, getAllTeamLeader } = require("../controllers/teamLeaderController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post('/register', createTeamLeader);
router.post('/login', loginTeamLeader);
router.get('/profile', validateToken, getTeamLeader);
router.post('/get-team-member', validateToken, getAllTeamLeader);

module.exports = router;