#!/usr/bin/env node
const prog = require('caporal');
const request = require('request');
const cheerio = require('cheerio');
//#1 String Transformation 
prog //(lowercase)
  .command('lowercase', 'lowercase kata')
  .argument('<kata>', 'App to deploy')
  .action(function(args) {
    console.log("============")
    let lower = args['kata'].toLowerCase()
    console.log(lower)

  });

prog //(uppercase)
.command('uppercase', 'uppercase kata')
.argument('<kata>', 'string')
.action(function(args) {
  console.log("============")
  let upper = args['kata'].toUpperCase()
  console.log(upper)
});

prog //capitalize
.command('capitalize', 'kapital kata')
.argument('<kata>', 'string')
.action(function(args) {
  let ar = args['kata'];
  let capital = ar.split(' ');
  let a = []
  for (let i = 0; i < capital.length; i++) {
      a[i] = capital[i] = capital[i].charAt(0).toUpperCase() + capital[i].slice(1).toLowerCase(); 
  }
  console.log(a.join(' '));
});

//#2 Arithmetic
prog // add
.command('add', 'add number')
.argument('<add>', 'numb')
.argument('[addmore...]', 'numb more')
.action(function(args) {
  console.log("============")
  let spl = args['addmore'].map(x => parseInt(x,10));
  let a = parseInt(args['add'],10)+spl.reduce((a,b)=> a +b,0);
  console.log(a)
});

prog //Subtract
.command('min', 'min number')
.argument('<min>', 'numb')
.argument('[minmore...]', 'numb more')
.action(function(args) {
  let spl = args['minmore'].map(x => parseInt(x,10));
  let a = parseInt(args['min'],10)-spl.reduce((a,b)=> a +b,0);
  console.log(a)
});

prog //multiply
.command('multiply', 'multiply number')
.argument('<multiply>', 'numb')
.argument('[multiplymore...]', 'multiply more')
.action(function(args) {
  
  let spl = args['multiplymore'].map(x => parseInt(x,10));
  let a = parseInt(args['multiply'],10)*spl.reduce((a,b)=> a *b,1);  
  console.log(a)

});

prog //divide
.command('devide', 'devide number')
.argument('<devide>', 'numb')
.argument('[devidemore...]', 'devide more')
.action(function(args) {
  console.log("============")
  let spl = args['devidemore'].map(x => parseInt(x,10));
  let a = parseInt(args['devide'],10)/spl.reduce((a,b)=> a +b);
  console.log(a)
});

//3. palindrome
prog 
.command('palin', 'apakah ini palindrome')
.argument('<string>', 'string')
.action(function(args){

    let re = args['string'].toLowerCase();
    let rev = '';

    let len = re.length;
    let imax = len -1;
    while (len--) {
      rev += re[imax];
      imax-=1;

    }
      let a = function (){
          if (rev==re) {
              return "Yes !";
            }else{
                return "No !";}              
    }
    console.log("is palin? "+ a());
})

prog //#4 Obfuscator
.command('obs', 'Obfuscator string')
.argument('<obs>', 'Obfuscator')
.argument('[obsmore...]', 'obs more')
.action(function(args) {

  let ar = args['obs'];
  let str= "";
  for (let i = 0; i < ar.length; i++) {
      str += "&#"+ar[i].charCodeAt() + ";"
      
  };
    console.log(str);
});

// //#5 Random String
prog 
.command('random', 'random alphanumeric')
.option('--length', 'length',prog.INT,32)
.option('--letters', 'letter',prog.BOOL)
.option('--numbers', 'numbers',prog.BOOL)
.option('--uppercase', 'uppercase',prog.BOOL)
.option('--lowercase', 'lowercase',prog.BOOL)
.action(function(args,options) {
    let text = "";
    let alfabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    function randomChar() {
        if (options.letters == false) {
            alfabet = alfabet.replace(/[^0-9]/g,'')
        }else if(options.numbers == false) {
            alfabet = alfabet.replace(/[^a-zA-Z]/g,'')   
        }else if(options.lowercase) {
            alfabet = alfabet.replace(/[^a-z0-9]/g,'')   
        }else if(options.uppercase) {
            alfabet = alfabet.replace(/[^A-Z0-9]/g,'')   
        }
        for (let i = 0; i < options.length; i++)
            text += alfabet.charAt(Math.floor(Math.random() * alfabet.length))
            return text;
      }
 console.log(randomChar())
})
prog // #6. get ip Addres private
.command('ip', 'find ip address')
.argument('<ipaddress>', 'length')
.action(function(args,options) {
   function a() {
    return require('child_process').execSync("ifconfig | grep inet | grep -v inet6 | awk '{gsub(/addr:/,\"\");print $2}'").toString().trim().split("\n");
  }
  console.log(a());
})

prog // #7. get ip Addres eksternal
.command('ipextern', 'find ip external')
.action(function(args,options,logger) {
  let req = require('child_process');
  req.exec('curl -s checkip.dyndns.org |sed -e \'s/.*Current IP Address: //\' -e \'s/<.*$//\' ', function(err,stdout,sterr){
    if (err){
      console.log("\n"+stderr);
    } else{
      console.log(stdout);
    }
 });
})

prog // #8. Headlines/scrapingS
.command('headlines', 'headlines')
.action(function(args,options,logger) {
  let url = 'https://www.kompas.com/';

  request(url, function (err, res, html) {
    if (!err && res.statusCode == 200) {
      let $ = cheerio.load(html);
      $('a.article__link').each(function(i, value) {
        process.stdout.write('Title: '+$(this).text()+'\n')
        process.stdout.write('URL: '+$(this).attr('href')+'\n')
        process.stdout.write('\n');
        process.stdout.write('------------------------------------------------------------------------------ \n');
    });
  }
});
})

prog //#9. convert file xls csv
.command('convert', 'convert file xlsx/csv')
.argument('<readfile>','read file extension')
.argument('<result>','result convert file')
.action(function(args,options,logger) {

        let xlsx = require('node-xlsx');
        let fs = require('fs');
        let obj = xlsx.parse(__dirname + `/${args.before}`); // parses a file
        let rows = [];
        let writeStr = "";
        for(let i = 0; i < obj.length; i++){
            let sheet = obj[i];
                        for(let j = 0; j < sheet['data'].length; j++){   //looping row         
            rows.push(sheet['data'][j]);//add the row to the rows array
            }
        }
        for(let i = 0; i < rows.length; i++) writeStr += rows[i].join(",") + "\n";//creates the csv string to write it to a file
        //writes to a file, but you will presumably send the csv as a      
        //response instead
        fs.writeFile(__dirname + `/${args.after}`, writeStr, function(err) {
            if(err) {
            return console.log(err);
         }
         console.log("check.csv saved !");
    });
})

prog //#10 screenshot from url 
  .command('screenshot', 'screenshoot file')
  .argument('<url>','input url')
  .option('--format','extension png',prog.STRING, 'png')
  .option('--output','nama',prog.STRING,'screenshot-00')
  .action(function(args, options, logger) {
    const fs = require('fs')
    const webshot = require('webshot')
    //filename
    let option = {
        shotSize: {
        width: 'all'
      , height: 'all'
      }}
    let dir = `./${options.output}1.png`;
    
    function callScreenshot(link,num,ext){
      let output = options.output
          output = output.split('.')
      if(options.output!== 'screenshot-00'){
        if(num==1) num = ''
        webshot(`${link}`,`${output[0]}.${output[1]}`,option, (err) => {
          if(err) return console.log(err)
      });
      }else{
        webshot(`${link}`,`${options.output}${num}.${ext}`,option, (err) => {
          if(err) return console.log(err)
      });
      }
    }
  let numberOfFiles = 1
  fs.readdirSync('./').forEach(num=>{if(num.includes('screenshot')) numberOfFiles++})
  if (fs.existsSync(dir)) callScreenshot(args.url,numberOfFiles,options.format)
  else callScreenshot(args.url,1,options.format)
  });

prog // #11. screenshot from list file
    .command('screenshot-list','ss from list.txt command')
    .argument('<url>','argument url')
    .option('--format','output image',prog.STRING,'jpg')
    .action(function(args,options,logger){
        const fs = require('fs')
        const webshot = require('webshot')
        let file = fs.readFileSync(`./${args.url}`,'utf8')
            file = file.split('\n')
          file.map(num=>{fullpath = num.split('/').pop()
              webshot(num,`${fullpath}.${options.format}`,err=>{
                if(err) console.log(err)
                else console.log(`from ${num} success`)
            })  
        })
    })

prog // #12. Headlines/scrapingS
.command('movies', 'find new film and now playing')
.action(function(args,options,logger) {
  const request = require('request');
  const cheerio = require('cheerio');
  let url = `https://www.cgv.id/en/movies/now_playing`;

  request(url, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      let $ = cheerio.load(body);
      $('.movie-list-body a').each(function(i,e) {
        let film = $(this).attr('href')
        let uri  = `https://www.cgv.id/${film}`;
        request(uri, function (err, res, htm) {
          if (!err && res.statusCode == 200) {
            let $ = cheerio.load(htm);
            $('.synopsis-section').each(function(i,e) {
              
              let title = $(this).prev().text().trim();
              let detail  = $(this).children().children().text().split('\t').filter(x => x!='');
              let synopsis = $(this).children().next().text().trim();
              process.stdout.write('\nTitle : '+ title);
              process.stdout.write (detail.join('\n'));
              process.stdout.write('\nSYNOPSIS : \n\n'+ synopsis);
              process.stdout.write('\n');
              process.stdout.write('--------------------------------------------------------------------------------------- \n');
           });
          } 
        });
      });
    } 
  });
})
prog.parse(process.argv);
// body > div.main-container > div > div.main-body-container.skin > div > div.movie-list-body