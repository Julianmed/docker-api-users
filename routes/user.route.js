const express = require('express');
const userRoutes = express.Router();

// Require user model in our routes module
let User = require('../models/user.model');

// Defined store route
/**
* @swagger
* /add:
* get:
*   description: Use to create a user.
*   responses:
*       '200':
*           description: A successful response.
*       '400':
*            description: Non success response.
*/
userRoutes.route('/add').post(function (req, res) {
    let user = new User(req.body);
    user.save()
    .then(user => {
        res.status(200).json({'user': 'user added successfully'});
    })
    .catch(err => {
        res.status(400).send("Unable to save to database");
    });
});

// Defined get data(index or listing) route
/**
 * @swagger
 * /:
 *  post:
 *      description: Use to request all users.
 *      responses:
 *          '200': 
 *              description: A request with successful response.
 *          '400':
*               description: A request with problem found.
 */
userRoutes.route('/').get(function (req, res) {
    User.find(function (err, users){
        if(err){
            res.status(400).send('Problem found: ',err);
        }
        else {
            res.status(200).json(users);
        }
    });
});

// Defined edit route
/**
 * @swagger
 * /edit/{id}:
 *  get:
 *      description: Use to request a user.
 *      parameters:
 *          -  in: path
 *             name: id
 *             required: true
 *             description: id of the user.
 *             schema:
 *                 type: string
 *                 format: guid
 *      responses:
 *          '200':
 *              description: A request with successful response.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              user_name:
 *                                  type: string
 *                                  description: Name of the user
 *                                  example: 'Julian Angel'
 *                              dni:
 *                                  type: string
 *                                  description: Number of identification of the user
 *                                  example: '1234567890'
 *                              age:
 *                                  type: number
 *                                  description: Age of the user
 *                                  example: 27
 *                              phone_number:
 *                                  type: string
 *                                  description: Number of the cellphone
 *                                  example: 3009648536
 *          '400':
*               description: A request with problem found.
 */
userRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user){
        if(!user) return res.status(404).send("User not found");
        else return res.status(200).json(user);
    });
});

// Defined update route
/**
 * @swagger
 * /update/{id}:
 *  put:
 *      description: Use to update the user information.
 *      responses:
 *          '200': 
 *              description: A request with successful response.
 *          '400':
 *              description: A request with problem found saving.
 *          '404':
 *              description: A request with user not found.
 */
userRoutes.route('/update/:id').put(function (req, res) {
    User.findById(req.params.id, function(err, user) {
        if (!user) return res.status(404).send('Could not load Document');
        else {
            user.user_name = req.body.user_name;
            user.dni = req.body.dni;
            user.age = req.body.age;
            user.phone_number = req.body.phone_number;
            user.save()
            .then(user => {
                res.status(200).send('Update complete');
            })
            .catch(err => {
                res.status(400).send("Unable to update the database");
            });
        }
    });
});

// Defined delete | remove | destroy route
/**
 * @swagger
 * /delete/{id}:
 *  delete:
 *      description: Use to delete the user information.
 *      responses:
 *          '200': 
 *              description: A request with successful response.
 *          '400':
 *              description: A request with problem found.
 */
userRoutes.route('/delete/:id').delete(function (req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user){
        if(err) res.status(400).send(err);
        else res.status(200).send('Successfully removed');
    });
});

module.exports = userRoutes;