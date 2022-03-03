const hbs = require('hbs')
hbs.registerPartials('./views/partials')

hbs.registerHelper('isMyProfile', (options) => {
  const { userName, currentUserName } = options.hash;
  return userName === currentUserName
})

/* hbs.registerHelper('userLikedProject', function (options) {
  const { project, likes } = options.hash;
  console.log("---", project, likes)
  if (project && likes && likes.some(like => like.project == project.id)) {
    console.log("---", project, likes)
    return options.fn(this);
  } else {
    console.log("---", project, likes)
    return options.inverse(this);
  }
}) */