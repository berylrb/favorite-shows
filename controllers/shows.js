import { Show } from "../models/show.js"

function newShow(req, res) {
  res.render("shows/new", {
    title: 'Add Show'
  })
}


function index(req, res) {
  Show.find({})
  .then(shows => {
    res.render('shows/index', {
      shows: shows,
      title: 'All Shows'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

export {
  newShow as new,
  index
}