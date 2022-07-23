import { response, Router } from 'express'
import axios from "axios"

const router = Router()



router.get('/', function (req, res) {
  axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.API_KEY}`)
    .then(response => {
      res.render('index', {
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
