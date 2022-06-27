import mongoose from 'mongoose'

const Schema = mongoose.Schema

const showSchema = new mongoose.Schema({
  showName: String,
  image: String,
  seasons: Number
}, {
  timestamps: true
})

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  shows: [showSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
