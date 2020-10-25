/* eslint-disable radix */
/* eslint-disable eqeqeq */
import fs from 'fs'
import path from 'path'
import data from '../../data/data.json'

const filePath = path.resolve(__dirname, '../../data/data.json')

class PostController {
  static get = (req, res) => {
    // Sort by Id (Ascending)
    data.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    // Search by title
    const { title } = req.query;
    const byTitle = data.filter((query) => query.title.toLowerCase() == title)
    if (title) {
      return res.status(200).json(byTitle);
    }

    return res.status(200).json(data);
  }

  static add = (req, res) => {
    const idCheck = data.find((index) => index.id === req.body.id)

    // Check if any req body fields are missing
    if (!req.body.id || !req.body.title || !req.body.author) {
      return res.status(401).send({ error: true, message: 'Field missing in request body.' })
    }

    // Check if id is exist already
    if (idCheck) {
      return res.status(400).send({ error: true, message: 'Bad Request! Id is exist already.' })
    }

    data.push(req.body)

    return fs.writeFile(
      filePath,
      JSON.stringify(data),
      'utf-8',
      () => res.status(201).json({ message: `Successfully saved new data with id:${req.body.id} on ${filePath}` }),
    )
  }

  static update = (req, res) => {
    const idCheck = data.find((index) => index.id == req.params.id)

    // Check if id isn't exist already
    if (!idCheck) {
      return res.status(404).send({ error: true, message: '404! Id is not exist.' })
    }

    for (let i = 0; i < data.length; i += 1) {
      if (data[i].id == req.params.id) {
        data[i].id = req.body.id;
        data[i].title = req.body.title;
        data[i].author = req.body.author;
      }
    }

    return fs.writeFile(
      filePath,
      JSON.stringify(data),
      'utf-8',
      () => res.status(200).json({ error: true, message: `Successfully saved data update on ${filePath}` }),
    )
  }

  static delete = (req, res) => {
    const idCheck = data.find((index) => index.id == req.params.id)

    // Check if id isn't exist already
    if (!idCheck) {
      return res.status(404).send({ error: true, message: '404! Id is not exist.' })
    }

    for (let i = 0; i < data.length; i += 1) {
      if (data[i].id == req.params.id) {
        data.splice(i, 1);
      }
    }

    return fs.writeFile(
      filePath,
      JSON.stringify(data),
      'utf-8',
      () => res.status(200).json({ message: `Successfully delete data with id:${req.params.id} on ${filePath}` }),
    )
  }
}

export default PostController
