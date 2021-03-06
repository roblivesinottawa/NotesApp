const Note = require("../models/note.model");

exports.create = (req, res) => {
  if (!req.body.content)
    return res.status(400).send({ message: "Note content cannot be empty!" });
  const note = new Note({
    title: req.body.title || "Untitled Note",
    content: req.body.content,
  });
  note
    .save()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message:
          err.message ||
          "An error occurred while creating the note. Try again.",
      })
    );
};
exports.findAll = (req, res) => {
  Note.find()
    .then((notes) => res.send(notes))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "An error occurred while retrieving notes.",
      })
    );
};

exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
    .then((note) => {
      if (!note)
        return res
          .status(404)
          .send({ message: `Note not found with id ${req.params.noteId}` });
      res.send(note);
    })

    .catch((err) => {
      if (err.kind == "ObjectId") {
        return res
          .status(404)
          .send({ message: `Note not found with id ${req.params.noteId}` });
      }
    });
  return res
    .status(500)
    .send({ message: `Error retrieving note with id ${req.params.noteId}` });
};

exports.update = (req, res) => {
  if (!req.body.content)
    return res.status(400).send({ message: "Note content cannot be empty!" });

  Note.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.content || "Untitled Note",
      content: req.body.content,
    },
    { new: true }
  )
    .then((note) => {
      if (!note)
        return res
          .status(404)
          .send({ message: `Note not found with id ${req.params.noteId}` });
      res.send(note);
    })
    .catch((err) => {
      if (err.kind == "ObjectId") {
        return res
          .status(404)
          .send({ message: `Note not found with id ${req.params.noteId}` });
      }
    });
  return res
    .status(500)
    .send({ message: `Error retrieving note with id ${req.params.noteId}` });
};
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then((note) => {
      if (!note)
        return res
          .status(404)
          .send({ message: `Note not found with id ${req.params.noteId}` });
      res.send({ message: `Note delete successfully!` });
    })
    .catch((err) => {
      if (err.kind == "ObjectId" || err.name == "Not Found") {
        return res
          .status(404)
          .send({ message: `Note not found with id ${req.params.noteId}` });
      }
    });
  return res
    .status(500)
    .send({ message: `Error retrieving note with id ${req.params.noteId}` });
};
