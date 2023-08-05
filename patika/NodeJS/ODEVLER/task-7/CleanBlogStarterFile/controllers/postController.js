const Sdata = require('../models/Sdata')


exports.getAllPosts = async (req, res) => {
  const sdatas = await Sdata.find({}).sort('-dataCreated')
  res.render('index', {
      sdatas,
  })
}

exports.getPost = async (req, res) => {
  const post = await Sdata.findById(req.params.id)
  res.render('post', {
      post,
  })
}

exports.createPost = async (req, res) => {
  await Sdata.create(req.body)
  res.redirect('/')
}

exports.updatePost = async (req, res) => {
  const post = await Sdata.findById(req.params.id)
  post.title = req.body.title
  post.details = req.body.details
  post.save()
  res.redirect(`/posts/${req.params.id}`)
}

exports.deletePost =  async (req, res) => {
  await Sdata.findByIdAndRemove(req.params.id)
  res.redirect('/')
}