import { response, Router } from 'express'
import axios from "axios"

const router = Router()

router.get('/', function (req, res) {
  axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)
    .then(response => {
      res.render('shows/popular', {
        title: 'Welcome to Queue',
        results: response.data.results
      })
    })
    
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
})

export {
  router
}
