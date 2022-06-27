import { Profile } from '../models/profile.js'

function addShow(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.shows.push(req.body)
    profile.save()
    .then(() => {
      res.redirect('/')
    })
  })
}


export {
  addShow
}