import {Controller} from "./controller/trainee/Controller"
import {Router} from "express"
import { errorHandler } from "./libs/routes/errorHandler"
// const router = express.Router();
const router= Router()

import AdminRoute from "./controller/trainee/routes"
import UserRoute from "./controller/user/routes"
// export let adminRoute=AdminRoute

// router.route("/")
// router.route('/').get();
// let ControllerDao = new Controller()
//  router.get('/health-check',ControllerDao.get)
// export let ControllerDao = controllerDao
export{
    AdminRoute,UserRoute
}



