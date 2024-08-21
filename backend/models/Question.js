const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  ImageUrl: {
    type: String,
  },
});

const questionSchema = new mongoose.Schema(
  {
    optionType: {
      type: String,
      enum: ["Text", "ImageUrl", "TextImageUrl"],
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [optionSchema],
    poll: [{ type: Number, default: [0, 0, 0, 0] }],
    impression: {
      type: Number,
      default: 0,
    },
    correctImpression: {
      type: Number,
      default: 0,
    },
    answer: {
      type: Number,
      required: true,
    },
    timer: {
      type: Number,
      default: 0,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
