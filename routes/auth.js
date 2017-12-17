import { Router } from 'express';
import passport from 'passport';

import * as authController from '../controllers/auth';

const router = Router();

router.post('/login', passport.authenticate('local'), authController.handleLoginSuccess);

router.get('/login/twitter', passport.authenticate('twitter'));
router.get('/login/twitter/callback', passport.authenticate('twitter'), authController.handleLoginSuccess);

router.get('/login/facebook', passport.authenticate('facebook'));
router.get('/login/facebook/callback', passport.authenticate('facebook'), authController.handleLoginSuccess);

router.get('/login/google', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));
router.get('/login/google/callback', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }), authController.handleLoginSuccess);

router.post('/register', authController.registerLocal);

export default router;
