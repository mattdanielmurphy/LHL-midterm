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
        return Promise.all(["https://www.google.com",
                            "https://www.lighthouselabs.ca",
                            "https://www.example.com",
                            "https://www.yahoo.com",
                            "https://www.nhl.com"])
    })

    .then((urls) => {
      return Promise.all(urls.map(takeScreenshot))
    }).then((screenshots) => {
      return Promise.all([
        knex('resources').insert({
          user_id: 1, url: 'www.google.com', title: 'google', description: 'It is google', screenshot: screenshots[0]
        }),
        knex('resources').insert({
          user_id: 2, url: 'www.lighthouselabs.ca', title: 'lighthouselabs', description: 'It is lighthouselabs', screenshot: screenshots[1]
        }),
        knex('resources').insert({
          user_id: 3, url: 'www.example.com', title: 'example', description: 'It is example',  screenshot: screenshots[2]
        }),
        knex('resources').insert({
          user_id: 4, url: 'www.yahoo.ca', title: 'yahoo', description: 'It is yahoo',  screenshot: screenshots[3]
        }),
        knex('resources').insert({
          user_id: 5, url: 'www.nlh.com', title: 'NHL', description: 'It is NHL',  screenshot: screenshots[4]
        })
      ])
    }).then(()=> {
      return Promise.all([
        knex('comments').insert({
          user_id: 1, resource_id: 1, created_at:'january 1, 1970', updated_at: 'february 1, 1970', content: 'This is a comment 1'
        }),
        knex('comments').insert({
          user_id: 2, resource_id: 2, created_at:'january 1, 1970', updated_at: 'february 2, 1970', content: 'This is a comment 2'
        }),
        knex('comments').insert({
          user_id: 3, resource_id: 3, created_at:'january 1, 1970', updated_at: 'february 3, 1970', content: 'This is a comment 3'
        }),
        knex('comments').insert({
          user_id: 4, resource_id: 4, created_at:'january 1, 1970', updated_at: 'february 4, 1970', content: 'This is a comment 4'
        }),
        knex('comments').insert({
          user_id: 5, resource_id: 5, created_at:'january 1, 1970', updated_at: 'february 5, 1970', content: 'This is a comment 5'
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
            })
          ])
      }).then(() => {
          return Promise.all([
            knex('tags').insert({
              type:'blog'
            }),
            knex('tags').insert({
              type:'tutorial'
            }),
            knex('tags').insert({
              type:'video'
            }),
            knex('tags').insert({
              type:'blog'
            }),
            knex('tags').insert({
              type:'tutorial'
            })
          ])
      }).then(() => {
          return Promise.all([
            knex('resources_tags').insert({
              tag_id:1, resource_id:1
            }),
            knex('resources_tags').insert({
              tag_id:2, resource_id:2
            }),
            knex('resources_tags').insert({
              tag_id: 3, resource_id:3
            }),
            knex('resources_tags').insert({
              tag_id:4, resource_id:4
            }),
            knex('resources_tags').insert({
              tag_id:5, resource_id:5
            })
          ])
      })
}; // seed
