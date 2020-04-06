const express = require('express');

const User = require('../models/User');

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

router.post('/register', async(req, res)=>{


	const {email} = req.body;
	
	console.log({email});
	try{

		if(await User.findOne({ email }))
			return res.send({error: 'User already existis'});


		const user = await  User.create(req.body);
		user.password = undefined;		
		return res.send({ user });
	}
	catch(err){
		return res.send({error: 'Registration Failed'});
	}	
});

router.post('/authenticate', async(req,res)=>{

	const { email, password} = req.body;
	
	const user = await User.findOne({ email }).select('+password');

	if(!user)
		return res.send({error:'User not found'});

	if(! await bcrypt.compare(password, user.password))
		return res.send({ error:'Invalida password'});		

	user.password = undefined;

	const token = jwt.sign({ id: user.id}, authConfig.secret,{ 
		expiresIn: 86400,
	});
	

	console.log(token);
	
	res.send({user, token });

});

// function generateToken(params = {}){
// 	const token = jwt.sign(params, authConfig.secret,{ 
// 		expiresIn: 86400,
// 	});

// }

module.exports = app => app.use('/auth', router);