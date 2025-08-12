import express from 'express';
import { verifyIsAdmin } from '../utils/verifyAdmin.js';
import { allUsers, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/allusers', verifyIsAdmin, allUsers)
router.delete('/deleteuser', verifyIsAdmin, deleteUser )

export default router