import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const showSchema = new mongoose.Schema({
  name: String,
  poster_path: String,
  mdbId: Number,
  imageUrl: String,
  released: Date,
  collectedBy: [{ type: Schema.Types.ObjectId, ref: "Profile:"}],
  reviews: [{ type: Schema.Types.ObjectId, ref: "ShowReview"}]
}, {
  timestamps: true
})

const Show = mongoose.model("Show", showSchema)

export {
  Show
}