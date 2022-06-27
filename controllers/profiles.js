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


function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles: profiles,
      title: 'Community'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    const isMe = profile._id.equals(req.user.profile._id)
    res.render("profiles/show", {
      title: `${profile.name}'s profile`,
      profile,
      isMe
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

export {
  index,
  show,
  addShow
}