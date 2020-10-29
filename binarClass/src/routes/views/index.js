import express from 'express'
import PostController from '../../controllers/PostController'

const router = express.Router()

router.get('/index', PostController.getIndexView)
router.get('/create', PostController.getCreateView)
router.get('/edit', PostController.getEditView)
router.post('/create', PostController.postPosts)
router.patch('/edit', PostController.editPosts)

export default router
