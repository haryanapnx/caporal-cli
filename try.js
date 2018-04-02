// function titleCase(str) {
//     str = str.toLowerCase().split(' ');
//     for (var i = 0; i < str.length; i++) {
//       str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
//     }
//     return str.join(' ');
//   }
//   console.log(titleCase("I'm a little tea pot"));

// function palindrome(str) {
//     var re = /[^A-Za-z0-9]/g;
//     str = str.toLowerCase().replace(re, '');
//     var len = str.length;
//     for (var i = 0; i < len/2; i++) {
//       if (str[i] !== str[len - 1 - i]) {
//           return "no";
//       }else{return "yes";}
//     }
    
//    }
//    console.log(palindrome("laal ini"));

// function makeid() {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
//     for (var i = 0; i < 5; i++)
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
  
//     return text;
//   }
  
//   console.log(makeid());

// var ips = require('child_process')
// .execSync("ifconfig | grep inet | grep -v inet6 | awk '{gsub(/addr:/,\"\");print $2}'").toString().trim().split("\n");
// console.log(ips);


  // let cp = require('child_process').execSync("ifconfig | grep inet | grep -v inet6 | awk '{gsub(/addr:/,\"\");print $2}'").toString().trim().split("\n");
 
  // console.log(cp);

// var ips = require('os').networkInterfaces().eth0.map(function(interface) { 
//   return interface.address;
// });console.log(ips);



// const fetch = require('node-fetch');
// const cheerio = require('cheerio');

// const searchUrl = 'https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';
// const movieUrl = 'https://www.imdb.com/title/';

// const searchCache = {};
// const movieCache = {};

// function searchMovies(searchTerm) {
//   if(searchCache[searchTerm]) {
//     console.log('Serving from cache:', searchTerm);
//     return Promise.resolve(searchCache[searchTerm]);
//   }

//   return fetch(`${searchUrl}${searchTerm}`)
//     .then(response => response.text())
//     .then(body => {
//       const movies = [];
//       const $ = cheerio.load(body);
//       $('.findResult').each(function(i, element) {
//         const $element = $(element);
//         const $image = $element.find('td a img');
//         const $title = $element.find('td.result_text a');

//         const imdbID = $title.attr('href').match(/title\/(.*)\//)[1];

//         const movie = {
//           image: $image.attr('src'),
//           title: $title.text(),
//           imdbID
//         };
//         movies.push(movie);
//       });

//       searchCache[searchTerm] = movies;

//       return movies;
//     });
// }

// function getMovie(imdbID) {
//   if(movieCache[imdbID]) {
//     console.log('Serving from cache:', imdbID);
//     return Promise.resolve(movieCache[imdbID]);
//   }

//   return fetch(`${movieUrl}${imdbID}`)
//     .then(response => response.text())
//     .then(body => {
//       const $ = cheerio.load(body);
//       const $title = $('.title_wrapper h1');

//       const title = $title.first().contents().filter(function() {
//         return this.type === 'text';
//       }).text().trim();
//       const rating = $('meta[itemProp="contentRating"]').attr('content');
//       const runTime = $('time[itemProp="duration"]').first().contents().filter(function() {
//         return this.type === 'text';
//       }).text().trim();

//       const genres = [];
//       $('span[itemProp="genre"]').each(function(i, element) {
//         const genre = $(element).text();
//         genres.push(genre);
//       });

//       const datePublished = $('meta[itemProp="datePublished"]').attr('content');
//       const imdbRating = $('span[itemProp="ratingValue"]').text();
//       const poster = $('div.poster a img').attr('src');
//       const summary = $('div.summary_text').text().trim();


//       function getItems(itemArray) {
//         return function(i, element) {
//           const item = $(element).text().trim();
//           itemArray.push(item);
//         };
//       }

//       const directors = [];
//       $('span[itemProp="director"]').each(getItems(directors));

//       const writers = [];
//       $('.credit_summary_item span[itemProp="creator"]').each(getItems(writers));

//       const stars = [];
//       $('.credit_summary_item span[itemProp="actors"]').each(getItems(stars));

//       const storyLine = $('#titleStoryLine div[itemProp="description"] p').text().trim();

//       const companies = [];
//       $('span[itemType="http://schema.org/Organization"]').each(getItems(companies));

//       const trailer = $('a[itemProp="trailer"]').attr('href');

//       const movie = {
//         imdbID,
//         title,
//         rating,
//         runTime,
//         genres,
//         datePublished,
//         imdbRating,
//         poster,
//         summary,
//         directors,
//         writers,
//         stars,
//         storyLine,
//         companies,
//         trailer: `https://www.imdb.com${trailer}`
//       };

//       movieCache[imdbID] = movie;

//       return movie;
//     });
// }

// module.exports = {
//   searchMovies,
//   getMovie
// };
// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

// fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

//     console.log('File successfully written! - Check your project directory for the output.json file');

// })

// // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
// res.send('Check your console!')

//     }) ;
// })

var movies = $this.attr('href')
        let uri = `https://www.cgv.id/${movies}`
         request(uri, function (err, res, body) {})