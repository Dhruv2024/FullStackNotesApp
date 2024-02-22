const express = require('express');
const app = express();
const dbConnect = require('./config/database');
const userRoutes = require('./routes/UserRoute');
const NoteRoutes = require('./routes/NotesRoute');
const cookieParser = require('cookie-parser');
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
require('dotenv').config();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})

dbConnect();

app.use(
    cors({
        origin: "https://notesync-black.vercel.app",
        credentials: true,
    })

)

//define routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/notes", NoteRoutes);
