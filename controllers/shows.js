import { Profile } from "../models/profile.js"
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

export {
  showSearch
}