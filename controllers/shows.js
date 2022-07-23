import { Show } from "../models/show.js"
import { ShowReview } from '../models/showReview.js'
import axios from "axios"

function showSearch(req, res) {
  console.log('this is reqbody', req.body.search)
  axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&language=en-US&page=1&query=${req.body.search}`)
  .then(response => {
    res.render('shows/search', {
      title: 'Search Results',
      search: req.body.search ? req.body.search : null,
      results: response.data.results
    })
  })
}

function show(req, res) {
  axios.get(`https://api.themoviedb.org/3/tv/${req.params.id}?api_key=${process.env.API_KEY}&language=en-US&page=1}`)
  .then(response => {
    console.log(response.data.id)
    Show.findOne({ mdbId: response.data.id })
    .populate('collectedBy')
    .populate({
      path: 'reviews',
      populate: {
        path: 'author'
      }
    })
    .then(show => {
      console.log(show?.collectedBy, req.user.profile._id, 'meatball')
      res.render("shows/show", {
        title: "Show Details",
        apiResult: response.data,
        show,
        userHasShow: show?.collectedBy.some(profile => profile._id.equals(req.user.profile._id)),
        userHasReviewed: show?.reviews.some(review => review.author?.equals(req.user.profile._id))
      })
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}


function getSimilar(req, res) {
  console.log('req body similar', req.params.id)
  axios.get(`https://api.themoviedb.org/3/tv/${req.params.id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`)
  .then(response => {
    console.log('response data', response.data.results)
    res.render('shows/similar/similar', {
      title: 'Similar Shows',
      simResults: response.data.results
  })
})
.catch(error => {
  console.log(error)
  res.redirect('/')
})
}


function getPopular(req, res) {
  axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)
    .then(response => {
      res.render('shows/popular', {
        title: 'Popular Shows',
        results: response.data.results
      })
    })
    
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
}





function addToCollection(req, res) {
  req.body.collectedBy = req.user.profile._id
  Show.findOne({ mdbId: req.params.id })
  .populate('collectedBy')
  .then(show => {
    if (show) {
    show.collectedBy.push(req.user.profile._id)
    show.save()
    .then(() => {
      res.redirect(`/shows/${req.params.id}`)
    })
  } else {
    Show.create(req.body)
    console.log('did this add')
    .then(() => {
      res.redirect(`/shows/${req.params.id}`)
    })
  }
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function removeFromCollection(req, res) {
  Show.findOne({ mdbId: req.params.id })
  .then(show => {
    console.log('show', show)
    show.collectedBy.remove({_id: req.user.profile._id})
    show.save()
    .then(() => {
      res.redirect(`/shows/${req.params.id}`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

export {
  showSearch,
  show,
  addToCollection,
  removeFromCollection,
  getSimilar,
  getPopular
}