const db = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = db.user_
//const OP = db.Sequelize.Op
const https = require('http')

exports.findAll = (req, res) => {
    User.findAll()
    .then(data => {
        res.send(data)
    })
}

exports.create = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "User must have name and password!"
        })
        return;
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    await User.create({
        username : req.body.username,
        password : hashPassword
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not insert the data'
            })
        })
}

exports.findOne = async (req, res, next) => {
    const user = await User.findOne({where: {username:req.body.username}})

    if(!user){
        return res.status(400).send({
            message: 'Username not found'
           })
    }

    if(!await bcrypt.compare(req.body.password, user.password)){
        return res.status(400).send({
            message: 'password incorrect'
           })
    }
     const token =  jwt.sign({id: user.id}, 'secret')
    // console.log(token)
    //withCredentials = true on the client side (http)
    res.cookie('jwt', token,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })

    user.update({
            token: token
        })
        const {password, ...data} = await user.toJSON()
    res.send({
        token: token,
        user: data
    })
}

exports.auth = async (req, res) => {
        try {
            const cookie = req.cookies['jwt']
            const claims = jwt.verify(cookie, 'secret')
    
            if (!claims) {
                return res.status(401).send({
                    message: 'unauthenticated'
                })
            }
    
            const user = await User.findOne({where:{id: claims.id}})
            const {password, ...data} = await user.toJSON()
            //console.log(data)
            res.send(data)

        } catch (e) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }
}

exports.logout = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'success'
    })
}