const express = require("express");
const { NoteModel } = require("../models/note.model");
const noteRouter = express.Router();

noteRouter.post("/create", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    console.log(note);
    await note.save();
    res.status(200).send("note added successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});

noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({
      author_ID: req.body.author_ID,
      author: req.body.author,
    });
    res.status(200).send(notes);
  } catch (err) {
    res.status(400).send({ err: err });
  }
});

noteRouter.post("/create", async (req, res) => {
  try {
    console.log(req.body);
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send(notes);
  } catch (err) {
    res.status(400).send({ err: err });
  }
});

noteRouter.patch("/update/:noteId", async (req, res) => {
  const { noteID } = req.params;
  const note = await NoteModel.find({ _id: noteID });
  try {
    if (req.body.author_ID !== note.author_ID) {
      res.status(200).send({ msg: "you are not aouthorized to edit it" });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res.status(200).send({ msg: `the note with id  ${noteID} is updated` });
    }
  } catch (err) {
    res.status(400).send({ err: err });
  }
});

noteRouter.delete("/delete/:noteId", async (req, res) => {
  const { noteID } = req.params;
  const note = await NoteModel.find({ _id: noteID });
  try {
    if (req.body.author_ID !== note.author_ID) {
      res.status(200).send({ msg: "you are not aouthorized to delete it" });
    } else {
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res.status(200).send({ msg: `the note with id  ${noteID} is updated` });
    }
  } catch (err) {
    res.status(400).send({ err: err });
  }
});

module.exports = { noteRouter };
