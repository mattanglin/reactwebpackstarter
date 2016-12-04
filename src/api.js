/**
 *  API for Express server
 *  This is essentially Express middleware to
 *  proxy /api requests through the server
 *  ApiClient to get around CORS access control.
 *  All routes being used on '/api' subpath.
 */
import Express, { Router } from 'express';
import ApiClient from 'helpers/ApiClient';
const api = Router();

api.use((req,res) => {
  const client = new ApiClient(req);

  // Use ApiClient
  client[req.method.toLowerCase()](req.url)
    .then(err => {
      // Send error here
      res.json(err)
    }, data => {
      res.json(data)
    })
})

export default api
