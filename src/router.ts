import {Controller} from "./controller/trainee/Controller"
import {Router} from "express"
import { errorHandler } from "./libs/routes/errorHandler"
// const router = express.Router();
const router= Router()
// router.route("/")
// router.route('/').get();
let ControllerDao = new Controller()
router.route('/health-check').get(
     ControllerDao.get(function(req,res,next){
         return res.send("8789989")
     })
)
// export let ControllerDao = controllerDao
module.exports =router
