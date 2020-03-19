const { Router } = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

//get, post, put, delete
const routes = Router();

routes.get('/', (require, response) =>{
    return response.json({ message: 'Hello Word...' })
});

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index)

module.exports = routes;