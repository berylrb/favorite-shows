import mongoose from 'mongoose'

const showSchema = new mongoose.Schema({
  title: {type: String, required: true},
  seasons: {type: Number, min: 1},
  vibe: String,
  notes: String
})

const Show = mongoose.model('Show', showSchema)

export {
  Show
}
