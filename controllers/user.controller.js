const User = require('../models/user.model')
const Like = require('../models/like.model')

module.exports.edit = (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            res.render('user/editProfile', { user })
        })
        .catch(next)
}

module.exports.doEdit = (req, res, next) => {
    if (req.file) {
        req.body.avatar = req.file.path
    }
    User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
        .then((user) => res.redirect(`/user/${user.id}`))
        .catch(next)
}

module.exports.user = (req, res, next) => {
    User.findById(req.params.id)
        .populate("projects")
        .then(user => {
            res.render('user/profile', { user })
        })

        .catch((error) => next(error));
}

module.exports.userForm = (req, res, next) => {
    const nameRegex = new RegExp(req.query.name)
    const currentJobRegex = new RegExp(req.query.currentJob)
    const skillRegex = new RegExp(req.query.skill)
    User.find({
        $and: [{ 'name': { $regex: nameRegex, $options: 'i' } },
        { 'currentJob': { $regex: currentJobRegex, $options: 'i' } },
        { 'skills': { $regex: skillRegex, $options: 'i' } }]
    })
        .populate("projects")
        .then(users => {
            res.json(users)
        })
        .catch((error) => next(error));
}

module.exports.allUsers = (req, res, next) => {
    User.find()
        .populate("projects")
        .then(users => {
            res.json(users)
        })
        .catch((error) => next(error));
}

module.exports.developers = (req, res, next) => {
    User.find()
        .then(users => {
            res.render('misc/developers', { users })
        })

        .catch((error) => next(error));
}

module.exports.doLike = (req, res, next) => {
    const projectId = req.params.id
    const userId = req.user.id
    Like.findOneAndDelete({ project: projectId, user: userId})
      .then(like => {
        if (like) {
          res.status(200).send({ success : 'Like remove from DDBB'})
        } else {
          return Like.create({ project: projectId, user: userId })
            .then(() => {
              res.status(201).send({ success : 'Like added to DDBB' })
            })
        }
      })
      .catch(next)
  }
