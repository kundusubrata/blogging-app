import express from 'express';
import { myProfile, signin, signout, signup, updateProfile } from '../controllers/user.controller';
import { isAuthenticatedUser } from '../middlewares/auth';

const router = express.Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/signout').get(signout);
router.route('/myprofile').get(isAuthenticatedUser,myProfile);
router.route('/updateprofile').put(isAuthenticatedUser,updateProfile);
export default router;