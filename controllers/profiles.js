import { Profile } from '../models/profile.js'
import { Show } from '../models/show.js'

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
    Show.find({ collectedBy: profile._id })
    .then(shows => {
      Profile.findById(req.user.profile)
      .then(userProfile => {
        res.render("profiles/show", {
          title: `${profile.name}'s profile`,
          profile,
          isMe,
          userProfile,
          shows
        })
      })
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}



function edit(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    res.render('profiles/edit', {
      title: `Updating ${profile.name}'s profile`,
      profile
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function update(req, res) {
  Profile.findByIdAndUpdate(req.params.id, req.body)
  .then(profile => {
    res.redirect(`/profiles/${profile._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}



export {
  index,
  show,
  addShow,
  edit,
  update
}