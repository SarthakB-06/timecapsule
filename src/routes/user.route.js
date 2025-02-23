import { Router } from "express";
// import { loginUser, registerUser } from "../controllers/user.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
import { userLogin, userRegister } from "../controllers/user.controller.js";


const router = Router();


router.route("/register").post(userRegister)
router.route("/login").post(userLogin)


export default router