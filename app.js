const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js')

const { render } = require('ejs');

const app = express();

let items = ['Code'];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {

    let day = date();
  // render is used for ejs, looks in views folder
  res.render('list', { listTitle: day, newListItems: items });
});



app.post('/', (req, res) => {

    let item = req.body.newItem;
if (req.body.list === 'Work') {
    workItems.push(item);
    res.redirect('/work');
} else {

  

  items.push(item);

  console.log(item); 

  res.redirect('/');
}});

app.get('/work', (req,res)=>{
    res.render('list', {listTitle: 'Work List', newListItems: workItems})
})

app.post('/work', (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    
    res.redirect('/');
  });

app.get('/about', (req,res)=>{
    res.render('about');
})


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
