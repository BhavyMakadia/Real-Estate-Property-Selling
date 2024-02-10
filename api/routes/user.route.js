import express from 'express';
import bcryptjs from 'bcryptjs';
import User from '../modules/user.model.js';
import { errorHandler } from '../utils/error.js';
import { test, deleteUser,getUserListings } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();
router.get('/test',test);
router.post('/update/:id',verifyToken, async (req, res, next) => {

  if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);

    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true });
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  }
  catch (error) {
    next(error)
  }
})

router.delete('/delete/:id',verifyToken, deleteUser)
router.get('/listings/:id',verifyToken, getUserListings)
router.get('/:id',verifyToken,async (req, res, next) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, 'User not found!'));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
});
  export default router;