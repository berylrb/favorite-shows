import { Show } from "../models/show.js"
import axios from "axios"

function showSearch(req, res) {
  console.log(req.body)
  axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&language=en-US&page=1&query=${req.body.search}`)
  .then(response => {
    console.log(response.data.results)
    res.render('shows/search', {
      title: 'Search Results',
      search: req.body.search ? req.body.search : null,
      results: response.data.results
    })
  })
}

function show(req, res) {
  axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&language=en-US&page=1&query=${req.params.id}`)
  .then(response => {
    Show.findOne({ mdbId: response.data.id })
    .then(show => {
      res.render("shows/show", {
        title: "Show Details",
        apiResult: response.data,
        show,
        userHasShow: show?.collectedBy.some(profile => profile._id.equals(req.user.profile._id)),
      })
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

export {
  showSearch,
  show
}