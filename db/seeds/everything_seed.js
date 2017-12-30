const takeScreenshot = require("../../webshot")

//.raw("DROP TABLE resources CASCADE;")

exports.seed = function(knex, Promise) {
  return knex("users")
    .then(function () {
      return Promise.all([
         knex('users').insert({
          username: 'shadow', email:'shadow@mail.com', password:'s'
        }),
        knex('users').insert({
          username: 'pumpkin', email:'pumpkin@mail.com', password:'p'
        }),
        knex('users').insert({
          username: 'callie', email:'callie@mail.com', password:'c'
        }),
        knex('users').insert({
          username: 'breezy', email:'breezy@mail.com', password:'b'
        }),
        knex('users').insert({
          username: 'ginger', email:'ginger@mail.com', password:'g'
        })
      ])
    })

    .then( ()=> {
        return Promise.all(["http://www.sqlcourse.com/",
                            "http://eloquentjavascript.net/",
                            "https://davidwalsh.name/",
                            "https://www.lynda.com/JavaScript-training-tutorials/244-0.html",
                            "https://www.youtube.com/user/TechGuyWeb",
                            "https://www.smashingmagazine.com/",
                            "http://howtocodeinhtml.com/"])
    })

    .then((urls) => {
      return Promise.all(urls.map(takeScreenshot))
    }).then((screenshots) => {
      return Promise.all([
        knex('resources').insert({
          id: 1, user_id: 2, url: 'www.sqlcourse.com', title: 'SQL Course', description: 'Learning SQL. Interactive Online SQL Training', screenshot: screenshots[0]
        }),
        knex('resources').insert({
          id: 2, user_id: 4, url: 'eloquentjavascript.net', title: 'Eloquent Javascript', description: 'This is an online book about JavaScript, programming, and the wonders of the digital. ', screenshot: screenshots[1]
        }),
        knex('resources').insert({
          id: 3, user_id: 3, url: 'davidwalsh.name', title: 'David Walsh Blog', description: 'This blog composes of topics related to JavaScript, personal thoughts, guides and much more. The blog design is captivating and is going to hook you up on the first visit.',  screenshot: screenshots[2]
        }),
        knex('resources').insert({
          id: 4, user_id: 1, url: 'www.lynda.com/JavaScript-training-tutorials/244-0.html', title: 'Lynda - Javascript Training and Tutorials', description: 'Watch our JavaScript how-to videos and learn to code, create, and build JavaScript arrays and functions. Understand how to write JavaScript code to create HTML5 sites and other interactive websites.',  screenshot: screenshots[3]
        }),
        knex('resources').insert({
          id: 5, user_id: 5, url: 'www.youtube.com/user/TechGuyWeb', title: 'Traversy Media', description: 'Web development and programming tutorials on YouTube',  screenshot: screenshots[4]
        }),
        knex('resources').insert({
          id: 6, user_id: 4, url: 'www.smashingmagazine.com', title: 'Smashing Magazine', description: 'Smashing Magazine delivers reliable, useful, but most importantly practical articles to web designers and developers.',  screenshot: screenshots[5]
        }),
        knex('resources').insert({
          id: 7, user_id: 1, url: 'howtocodeinhtml.com', title: 'How to code in HTML5 and CSS3', description: 'A book that helps people start making websites.',  screenshot: screenshots[6]
        })
      ])
    }).then(()=> {
      return Promise.all([
        knex('comments').insert({
          user_id: 1, resource_id: 1, created_at:'january 1, 2017', updated_at: 'february 1, 2017', content: 'SQL course was great!'
        }),
        knex('comments').insert({
          user_id: 2, resource_id: 2, created_at:'january 8, 2017', updated_at: 'february 2, 2017', content: 'Loved this book :)'
        }),
        knex('comments').insert({
          user_id: 3, resource_id: 3, created_at:'january 12, 2017', updated_at: 'february 3, 2017', content: 'Most articles were spot on. Great insight into the industry'
        }),
        knex('comments').insert({
          user_id: 4, resource_id: 4, created_at:'january 16, 2017', updated_at: 'february 4, 2017', content: "Can't believe I learnt Javascript so quickly with the Lynda tutorials! Videos were amazing."
        }),
        knex('comments').insert({
          user_id: 5, resource_id: 5, created_at:'january 19, 2017', updated_at: 'february 5, 2017', content: 'The video tutorials were so useful!'
        }),
        knex('comments').insert({
          user_id: 4, resource_id: 6, created_at:'january 20, 2017', updated_at: 'february 6, 2017', content: 'Love love love Smashing magazine.'
        }),
        knex('comments').insert({
          user_id: 5, resource_id: 7, created_at:'january 26, 2017', updated_at: 'february 7, 2017', content: 'This book made learning html5 and css3 a breeze.'
        })
      ])
    }).then(()=> {
        return Promise.all([
          knex('likes').insert({
            user_id: '1', resource_id:'1', like: 0
          }),
          knex('likes').insert({
            user_id: '2', resource_id:'2', like: 1
          }),
          knex('likes').insert({
            user_id: '3', resource_id:'3', like: 0
          }),
          knex('likes').insert({
            user_id: '4', resource_id:'4', like: 1
          }),
          knex('likes').insert({
            user_id: '5', resource_id:'5', like: 0
          }),
          knex('likes').insert({
            user_id: '3', resource_id:'7', like: 0
          }),
          knex('likes').insert({
            user_id: '5', resource_id:'6', like: 0
          })
        ])
      }).then(()=> {
          return Promise.all([
            knex('ratings').insert({
              user_id: '1', resource_id:'1', value: 0
            }),
            knex('ratings').insert({
              user_id: '2', resource_id:'2', value: 1
            }),
            knex('ratings').insert({
              user_id: '3', resource_id:'3', value: 0
            }),
            knex('ratings').insert({
              user_id: '4', resource_id:'4', value: 1
            }),
            knex('ratings').insert({
              user_id: '5', resource_id:'5', value: 0
            }),
            knex('ratings').insert({
              user_id: '1', resource_id:'6', value: 0
            }),
            knex('ratings').insert({
              user_id: '4', resource_id:'7', value: 1
            })
          ])
      }).then(() => {
          return Promise.all([
            knex('tags').insert({
              id: 1, type:'blog'
            }),
            knex('tags').insert({
              id: 2, type:'tutorial'
            }),
            knex('tags').insert({
              id: 3, type:'video'
            }),
            knex('tags').insert({
              id: 4, type:'article'
            }),
            knex('tags').insert({
              id: 5, type:'book'
            })
          ])
      }).then(() => {
          return Promise.all([
            knex('resources_tags').insert({
              tag_id:2, resource_id:1
            }),
            knex('resources_tags').insert({
              tag_id:5, resource_id:2
            }),
            knex('resources_tags').insert({
              tag_id: 1, resource_id:3
            }),
            knex('resources_tags').insert({
              tag_id:4, resource_id:3
            }),
            knex('resources_tags').insert({
              tag_id:3, resource_id:4
            }),
            knex('resources_tags').insert({
              tag_id:2, resource_id:4
            }),
            knex('resources_tags').insert({
              tag_id:3, resource_id:5
            }),
            knex('resources_tags').insert({
              tag_id:2, resource_id:5
            }),
            knex('resources_tags').insert({
              tag_id:4, resource_id:6
            }),
            knex('resources_tags').insert({
              tag_id:5, resource_id:7
            })
          ])
      })
}; // seed
