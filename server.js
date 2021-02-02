const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
var multer = require('multer');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.engine('hbs', hbs());
app.set('view engine', 'hbs');



app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', {name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});
app.use(express.urlencoded({ extended: false }));

/*app.post('/contact/send-message', (req, res) => {
  res.json(req.body);
});*/
//app.use(express.json());
app.post('/contact/send-message', (req, res) => {

  const { author, sender, title, message,myImage } = req.body;

  if(author && sender && title && message && myImage) {
  res.render('contact', { isSent: true, fileName: myImage});
}
else {
  res.render('contact', { isError: true });
}

});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
