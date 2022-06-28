import { Show } from '../models/show.js'
import { ShowReview } from '../models/showReview.js'


function create(req, res) {
  req.body.author = req.user.profile._id
  req.body.game = req.params._id
  ShowReview.create(req.body)
  .then(review => {
    Show.findById(req.params.id)
    .then(show => {
      show.reviews.push(review._id)
      show.save()
      .then(() => {
        res.redirect(`/shows/${show.mdbId}`)
      })
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}



export { 
  create
}