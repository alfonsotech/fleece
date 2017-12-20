# fleece
Scrape content from the web and store in a MongoDb, then randomly select content from this database to be sent out over Twitter. Currently scrapes from FreeCodeCamp's Medium accoutn and JS Feeds every 24 hours, then tweets out a new post every 30 minutes. 

## Getting Started

Fork the Fleece repo.

Clone your forked repo.

Set your remote upstream to the original repo.


## Built With

* [express](https://expressjs.com) - Node.js web application framework.
* [body-parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware.
* [nightmare](https://www.npmjs.com/package/nightmare) - A high-level browser automation library (not currently being used).
* [request](https://www.npmjs.com/package/request) - The simplest way possible to make http calls.
* [cheerio](https://www.npmjs.com/package/cheerio) - Parses markup and provides an API for traversing/manipulating the resulting data structure. .
* [mongoose](https://www.npmjs.com/package/mongoose) - A MongoDB object modeling tool designed to work in an asynchronous environment.
* [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js.
* [twitter](https://www.npmjs.com/package/twitter) - An asynchronous client library for the Twitter REST and Streaming API's.


## Versioning

body-parser - 1.15.0,
cheerio - 0.20.0
express - 4.13.4
mongoose - 4.4.6
morgan - 1.8.2
nightmare - 2.10.0
request - 2.69.0
twitter - 1.7.1


## Author(s)

[Rita Alfonso](https://github.com/alfonsotech)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
