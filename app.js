const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const app = express()
const port = 1111

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(express.json());

app.get('/', (request, response) => {

	response.render('contact');

});


app.post('/send', 
	[
		check('name').notEmpty().withMessage('Name is required'),
		check('email').notEmpty().withMessage('email is required'),
		check('email').isEmail().withMessage('Invalid Email Address'),
		check('subject').notEmpty().withMessage('Subject is required'),
		check('message').notEmpty().withMessage('Message is required')
	], (request, response) => {
        const errors = validationResult(request);
		

		console.log(errors.isEmpty());
		if(!errors.isEmpty())
		{
			response.render('contact', { errors : errors.mapped() });
		}else{
			response.send("hello")
		}
    })

app.listen(port,() => {
    console.log(`port ${port} is connectide`);

})
