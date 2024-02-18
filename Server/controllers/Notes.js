const Notes = require("../models/Notes");
const User = require("../models/User");

exports.createNote = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(403).json({
                success: false,
                message: "fill both field"
            })
        }

        const userId = req.user.id;
        const newNote = await Notes.create({
            title: title,
            description: description,
            createdBy: userId,
        })
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    notes: newNote._id
                }
            },
            { new: true }
        )
            .populate("notes");

        return res.status(200).json({
            success: true,
            message: "Note added successfully"
        })
    }
    catch (err) {
        return res.status(503).json({
            success: false,
            message: "Something went wrong!! Try again"
        })
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const { noteId } = req.body;
        if (!noteId) {
            return res.status(403).json({
                success: false,
                message: "Id not present",
            })
        }
        const userId = req.user.id;
        const note = await Notes.findByIdAndDelete({ _id: noteId });
        const updatedUser = await User.findByIdAndUpdate(
            { _id: userId },
            {
                $pull: {
                    notes: noteId,
                }
            },
            { new: true },
        ).populate("notes");
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            updatedUser,
        })
    }
    catch (err) {
        return res.status(503).json({
            success: false,
            message: "Something went wrong!! Try again",
            error: err.message,
        })
    }
}

exports.updateNote = async (req, res) => {
    try {
        const { noteId, title, description } = req.body;
        const UpdatedNote = await Notes.findByIdAndUpdate(
            { _id: noteId },
            {
                title: title,
                description: description,
                updatedAt: Date.now(),
            },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "Note updated successfully",
            UpdatedNote,
        })
    }
    catch (err) {
        return res.status(503).json({
            success: false,
            message: "Something went wrong!! Try again",
            error: err.message,
        })
    }
}

exports.getAllNotes = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User Id not present",
            })
        }
        const user = await User.findById({ _id: userId }).populate({
            path: "notes",
            options: { sort: { updatedAt: -1 } },
        });
        return res.status(200).json({
            success: true,
            message: "Notes fetched successfully",
            notes: user.notes,
        })
    }
    catch (err) {
        return res.status(503).json({
            success: false,
            message: "Something went wrong!! Try again",
            error: err.message,
        })
    }
}

exports.getNoteDetail = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User Id not present",
            })
        }
        const { noteId } = req.body;
        // console.log("Note id is:" + noteId)
        if (!noteId) {
            return res.status(400).json({
                success: false,
                message: "Note id not present",
            })
        }
        const note = await Notes.findById({ _id: noteId });
        if (!note) {
            return res.status(400).json({
                success: false,
                message: "Note doesn't Exist",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Note fetched successfully",
            note
        })
    }
    catch (err) {
        return res.status(503).json({
            success: false,
            message: "Something went wrong!! Try again",
            error: err.message,
        })
    }
}