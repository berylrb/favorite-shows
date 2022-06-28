import mongoose from "mongoose";

const Schema = mongoose.Schema;

const showReviewSchema = new Schema({
  rating: {type: Number, min: 1, max: 10},
  content: String,
  show: {type: Schema.Types.ObjectId, ref: "Show"},
  author: {type: Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true,
})

const ShowReview = mongoose.model("ShowReview", showReviewSchema)

export {
  ShowReview
}