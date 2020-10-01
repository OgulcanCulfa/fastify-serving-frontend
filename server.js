// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });
const path = require("path");
const { get } = require('http');
const getName = require('./db/getName');


// Registering

fastify.register(require('fastify-mongodb'), {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  
  url: 'mongodb://localhost:27017/mehmet'
})


fastify.register(require("fastify-static"), {
    root: path.join(__dirname, "client"),
    prefix: "/"
})

fastify.register(require("point-of-view"),{
  engine: {
    handlebars: require("handlebars")
  }
})



// Declare a route

fastify.get('/', function (req, reply) {


    const db = this.mongo.db
    db.collection('books', onCollection)
    function onCollection (err, col) {
      if (err) return reply.send(err)

      col.findOne({ name: "Stannis Baratheon" }, (err, book) => {
      
      reply.view("./client/index.html",{
        data: JSON.stringify(book.name).replace(/['"]+/g,"")
        
      })
    })
  }

  });

  
      


// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}


start()