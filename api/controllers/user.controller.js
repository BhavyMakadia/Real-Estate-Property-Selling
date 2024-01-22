import bcryptjs from 'bcryptjs';
import User from '../modules/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
  res.json({
    message: 'API route is work',

  });
}


export const deleteUser = async (req, res, next) => {

  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only delete your own account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json(0);
  } catch (error) {
    next(error);
  }

};