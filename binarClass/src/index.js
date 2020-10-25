import express from 'express'
import PostController from './controllers/PostController'

const app = express()
app.use(express.json())

app.get('/posts', PostController.get)
app.post('/posts', PostController.add)
app.patch('/posts/:id', PostController.update)
app.delete('/posts/:id', PostController.delete)

app.listen(3000, () => console.log('Running on localhost:3000/'))
