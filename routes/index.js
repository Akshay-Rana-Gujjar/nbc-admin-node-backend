var express = require("express");
var router = express.Router();

const routesMap = [
  {
    route: "/courses",
    router: require("./courses")
  },
  {
    route: "/login",
    router: require("./login")
  },
  {
    route: "/signup",
    router: require("./signup")
  },
  {
    route: "/upload",
    router: require("./upload")
  },
  {
    route: "/users",
    router: require("./users")
  },
  {
    route: "/search",
    router: require("./search")
  }
]

routesMap.forEach(r=>{
  router.use(r.route, r.router);
});

module.exports = router;
