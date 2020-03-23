const express = require('express');
const router = express.Router();
const passport = require('passport');

// Kudos model
const Kudo = require('../../models/Kudo');

// Kudo validation

// @route GET api/kudos/test
// @desc  Test kudo route
// @access Public
router.get('/test', (req,res)=> res.json({msg: "Kudos are working"}));

// @route GET api/kudos
// @desc  Test kudo route
// @access Private
router.get(
    '/',
    passport.authenticate('jwt', {session:false}),
    (req, res) => {
        Kudo.findOne({user:req.user.id}).then(
            kudo => {
                res.json(kudo.my_kudos)
            }
        ).catch(err => res.status(404).json({nokudosfound: `Kudos err: ${err}`}))
    }
);

// @route GET api/givenkudos
// @desc  Test kudo route
// @access Private
router.get(
    '/givenkudos',
    passport.authenticate('jwt', {session:false}),
    (req, res) => {
        Kudo.findOne({user:req.user.id}).then(
            kudo => {
                res.json(kudo.given_kudos)
            }
        ).catch(err => res.status(404).json({nokudosfound: `Kudos err: ${err}`}))
    }
);

// @route GET api/givenkudos
// @desc  Test kudo route
// @access Private
router.get(
    '/kudoscount',
    passport.authenticate('jwt', {session:false}),
    (req, res) => {
        Kudo.findOne({user:req.user.id}).then(
            kudo => {
                res.json(kudo.kudos_count)
            }
        ).catch(err => res.status(404).json({nokudosfound: `Kudos err: ${err}`}))
    }
);
// @route POST api/kudos
// @desc  Test kudo route
// @access Private
router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Kudo.findOne({user:req.user.id}).then(
            kudo => {
                let inKudo;
                let to_user;
                let {kudos_count, given_kudos} = kudo;
                if(kudos_count<1){
                    res.status(400).json({kudos_count: 'You can only send 3 kudos in a week'})
                }else{

                Kudo.findOne({name: req.body.userName}).then(
                    indKudo => {
                        console.log('IndKudo: ', indKudo)
                        let indKudos = indKudo.my_kudos;
                        to_user = indKudo.user;
                        inKudo = {
                            user: req.user.id,
                            name: req.user.name,
                            message: req.body.message
                        };
                        indKudos.push(inKudo);
                        indKudo.my_kudos = indKudos;
                        indKudo.save().then(k=>(console.log(''))).catch(err=>console.log(err))
                    }
                )
                let given_kudo={
                    user: to_user,
                    name: req.body.userName,
                    message: req.body.message
                }
                given_kudos.push(given_kudo);
                kudo.kudos_count = kudos_count-1;
                kudo.given_kudos = given_kudos;
                kudo.save().then(k=>res.json(kudo)).catch(err=>console.log(err))
                }
            }
        ).catch(err=>res.status(404).json({userName: 'User is not found'}))
    }
);
module.exports = router;