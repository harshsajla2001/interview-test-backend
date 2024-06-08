const express = require("express");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

connectDB();

const port = process.env.PORT || 8001;
app.use(cors());
app.use(express.json());

app.use("/api/v1/team-leader", require("./routes/teamLeaderRoutes"));
app.use("/api/v1/team-member", require("./routes/teamMemberRoutes"));
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`)
})