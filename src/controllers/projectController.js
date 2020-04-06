const express = require('express');

const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

const Info = require('../models/Info');

router.get('/',(req, res) =>{
	res.send({ ok: true, user: req.userId});
})

router.post('/createInfo',async(req,res)=>{


	const {content} = req.body;
	
	console.log({content});
	try{

		// if(await User.findOne({ email }))
		// 	return res.send({error: 'User already existis'});

		const info = await  Info.create(req.body);
				
		return res.send({ info });
	}
	catch(err){
		return res.send({error: 'Registration Failed'});
	}	
})

router.get('/listInfo', async(req,res)=>{

	try{

		// if(await User.findOne({ email }))
		// 	return res.send({error: 'User already existis'});

		const infos = await  Info.find();
				
		return res.send({ infos });
	}
	catch(err){
		return res.send({error: 'Registration Failed'});
	}	

})


router.post('/deleteInfo', async(req,res)=>{
	
	try{

		const {_id} = req.body;
		
		const info = await Info.deleteOne({ _id })
		
		res.send({ok: true});
	}
	catch(err){
		return res.send({error: 'Registration Failed'});
	}	
})


module.exports = app => app.use('/projects', router);

