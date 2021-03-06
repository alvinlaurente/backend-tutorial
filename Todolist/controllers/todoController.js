const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB
const uri = 'mongodb+srv://test:test@todolistapp.p4hsw.mongodb.net/todo?retryWrites=true&w=majority';
try {
  mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, () => console.log("Mongoose is connected."));
} catch (e) {
  console.log("Could not connect");
}

// Create Schema
const todoSchema = new mongoose.Schema({
  item: {
    type: String
  },
})

// Model
const Todo = mongoose.model('Todo', todoSchema);


const urlencodedParser = bodyParser.urlencoded({extended: true});
// let data = [{item: 'get milk'}, {item: 'walk with dog'}, {item: 'exercise'}]; // -> Dummy Data

module.exports = function(app){
  // View or Read
  app.get('/', (req, res) => {
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render('todo', {todo: data});
    })
  })

  app.get('/todo', (req, res) => {
    // Get data from MongoDB and pass it to view
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render('todo', {todo: data});
    });
  });

  // Add
  app.post('/todo', urlencodedParser, (req, res) => {
    // Get data from the view and add it to MongoDB
    Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.redirect('todo');
    });
  });

  // Delete
  app.delete('/todo/:item', (req, res) => {
    // Delete requested item from MongoDB
    Todo.find({item: req.params.item.replace(/^\s+|\s+$/gm,"")}).deleteOne((err, data) => {
      if (err) throw err;
      res.send(data);
    })
  });

};