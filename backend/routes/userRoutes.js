
import express from "express";
import { authUser,registerUser,getUserProfile, updateUserProfile, getUsers, deleteUser } from "../controllers/userController.js";
import {admin, protect} from "../middleware/authMiddleware.js";

const router = express.Router();


router.route('/').post( registerUser).get(protect,admin,getUsers)
router.post('/login',authUser)
router.delete('/:id',protect,admin,deleteUser)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)


export default router