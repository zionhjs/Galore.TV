if (Meteor.isServer) {

  Meteor.methods({
      shows: function () {
          this.unblock();
          return Meteor.http.call("GET", "https://galoretv-api.herokuapp.com/shows");
      }
  });

  Meteor.methods({
      featured: function () {
          this.unblock();
          return Meteor.http.call("GET", "https://galoretv-api.herokuapp.com/featured");
      }
  });

  Meteor.methods({
      liveFrom: function () {
          this.unblock();
          return Meteor.http.call("GET", "https://galoretv-api.herokuapp.com/liveFrom");
      }
  });

  // Meteor.methods({
  //     askPush: function () {
  //         this.unblock();
  //         return Meteor.http.call("GET", "https://galoretv-api.herokuapp.com/askPush");
  //     }
  // });

  Meteor.methods({
      model20: function () {
          this.unblock();
          return Meteor.http.call("GET", "https://galoretv-api.herokuapp.com/model20");
      }
  });

  Meteor.methods({
      teachMe: function () {
          this.unblock();
          return Meteor.http.call("GET", "https://galoretv-api.herokuapp.com/teachMe");
      }
  });

  Meteor.methods({
      girls: function () {
          this.unblock();
          return Meteor.http.call("GET", "https://galoretv-api.herokuapp.com/girls");
      }
  });

  Meteor.methods({
      exclusives: function () {
          this.unblock();
          return Meteor.http.call("GET", "https://galoretv-api.herokuapp.com/exclusives");
      }
  });

  Meteor.methods({
      bombshellOnStreet: function () {
          this.unblock();
          return Meteor.http.call("GET", "https://galoretv-api.herokuapp.com/bombshellOnStreet");
      }
  });

  Meteor.methods({
      etc: function () {
          this.unblock();
          return Meteor.http.call("GET", "https://galoretv-api.herokuapp.com/etc");
      }
  });

  Meteor.methods({
      originals: function () {
          this.unblock();
          return Meteor.http.call("GET", "https://galoretv-api.herokuapp.com/originals");
      }
  });

  Meteor.methods({
      uncovered: function () {
          this.unblock();
          return Meteor.http.call("GET", "https://galoretv-api.herokuapp.com/uncovered");
      }
  });

  Meteor.methods({
      beautyConfessional: function () {
          this.unblock();
          return Meteor.http.call("GET", "https://galoretv-api.herokuapp.com/beautyConfessional");
      }
  });

  // WordPress Methods
  Meteor.methods({
      wp: function () {
          this.unblock();
          return Meteor.http.call("GET", "https://galoremag.com/wp-json/wp/v2/posts");
      }
  });

  function makeSlug(title) {
    let str = title;
        str = str.replace(/[^a-zA-Z0-9\s]/g,"");
        str = str.toLowerCase();
        str = str.replace(/\s/g,'-');
        str = str.replace(/^-+|-+$|(-)+/g, '$1');
        return str;
  }

  let everyHour = new Cron(function() {
    Meteor.call("shows", function(error, results) {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(results.content); //results.data should be a JSON object
        // Session.set(data);
        _.each(data, function(item) {
          // debugger;
          Shows.upsert(item.url, {
            $set: {
              url: item.url,
              title: item.title,
              slug: makeSlug(item.title),
              desc: item.desc,
              date: item.date,
              thumb: item.thumb,
              thumbLg: item.thumbLg
            }
          }, true);
        });
      }
    });

    Meteor.call("featured", function(error, results) {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(results.content); //results.data should be a JSON object
        // Session.set(data);
        Vids.update({"featured": true}, {$set: {"featured": false}}, {multi: true});

        _.each(data, function(item) {
          // console.log(item.title);
          Vids.upsert(item.url, {
            $set: {
              featured: true,
              hero: item.hero
              // slug: makeSlug(item.title),
              // url: item.url,
              // title: item.title,
              // desc: item.desc,
              // date: item.date,
              // thumb: item.thumb,
            }
          }, true);
        });
      }
    });

    Meteor.call("liveFrom", function(error, results) {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(results.content); //results.data should be a JSON object
        // Session.set(data);
        _.each(data, function(item) {
          // console.log(item.title);
          Vids.upsert(item.url, {
            $set: {
              url: item.url,
              title: item.title,
              slug: makeSlug(item.title),
              desc: item.desc,
              date: item.date,
              thumb: item.thumb,
              thumbLg: item.thumbLg
            },
            $addToSet : {
              listId: item.listId
            }
          }, true);
        });
      }
    });

    Meteor.call("model20", function(error, results) {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(results.content); //results.data should be a JSON object
        // Session.set(data);
        _.each(data, function(item) {
          // console.log(item.title);
          Vids.upsert(item.url, {
            $set: {
              url: item.url,
              title: item.title,
              slug: makeSlug(item.title),
              desc: item.desc,
              date: item.date,
              thumb: item.thumb,
              thumbLg: item.thumbLg
            },
            $addToSet : {
              listId: item.listId
            }
          }, true);
        });
      }
    });

    Meteor.call("teachMe", function(error, results) {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(results.content); //results.data should be a JSON object
        // Session.set(data);
        _.each(data, function(item) {
          // console.log(item.title);
          Vids.upsert(item.url, {
            $set: {
              url: item.url,
              title: item.title,
              slug: makeSlug(item.title),
              desc: item.desc,
              date: item.date,
              thumb: item.thumb,
              thumbLg: item.thumbLg
            },
            $addToSet : {
              listId: item.listId
            }
          }, true);
        });
      }
    });

    Meteor.call("girls", function(error, results) {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(results.content); //results.data should be a JSON object
        // Session.set(data);
        _.each(data, function(item) {
          // console.log(item.title);
          Vids.upsert(item.url, {
            $set: {
              url: item.url,
              title: item.title,
              slug: makeSlug(item.title),
              desc: item.desc,
              date: item.date,
              thumb: item.thumb,
              thumbLg: item.thumbLg
            },
            $addToSet : {
              listId: item.listId
            }
          }, true);
        });
      }
    });

    Meteor.call("bombshellOnStreet", function(error, results) {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(results.content); //results.data should be a JSON object
        // Session.set(data);
        _.each(data, function(item) {
          // console.log(item.title);
          Vids.upsert(item.url, {
            $set: {
              url: item.url,
              title: item.title,
              slug: makeSlug(item.title),
              desc: item.desc,
              date: item.date,
              thumb: item.thumb,
              thumbLg: item.thumbLg
            },
            $addToSet : {
              listId: item.listId
            }
          }, true);
        });
      }
    });

    Meteor.call("originals", function(error, results) {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(results.content); //results.data should be a JSON object
        // Session.set(data);
        _.each(data, function(item) {
          console.log(item.title);
          Vids.upsert(item.url, {
            $set: {
              url: item.url,
              title: item.title,
              slug: makeSlug(item.title),
              desc: item.desc,
              date: item.date,
              thumb: item.thumb,
              thumbLg: item.thumbLg
            },
            $addToSet : {
              listId: item.listId
            }
          }, true);
        });
      }
    });

    Meteor.call("etc", function(error, results) {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(results.content); //results.data should be a JSON object
        // Session.set(data);
        _.each(data, function(item) {
          // console.log(item.title);
          Vids.upsert(item.url, {
            $set: {
              url: item.url,
              title: item.title,
              slug: makeSlug(item.title),
              desc: item.desc,
              date: item.date,
              special: true,
              thumb: item.thumb,
              thumbLg: item.thumbLg
            },
            $addToSet : {
              listId: item.listId
            }
          }, true);
        });
      }
    });

    Meteor.call("exclusives", function(error, results) {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(results.content); //results.data should be a JSON object
        // Session.set(data);
        _.each(data, function(item) {
          // console.log(item.title);
          Vids.upsert(item.url, {
            $set: {
              url: item.url,
              title: item.title,
              slug: makeSlug(item.title),
              desc: item.desc,
              date: item.date,
              special: true,
              thumb: item.thumb,
              thumbLg: item.thumbLg
            },
            $addToSet : {
              listId: item.listId
            }
          }, true);
        });
      }
    });

    Meteor.call("uncovered", function(error, results) {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(results.content); //results.data should be a JSON object
        // Session.set(data);
        _.each(data, function(item) {
          // console.log(item.title);
          Vids.upsert(item.url, {
            $set: {
              url: item.url,
              title: item.title,
              slug: makeSlug(item.title),
              desc: item.desc,
              date: item.date,
              special: true,
              thumb: item.thumb,
              thumbLg: item.thumbLg
            },
            $addToSet : {
              listId: item.listId
            }
          }, true);
        });
      }
    });

    Meteor.call("beautyConfessional", function(error, results) {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(results.content); //results.data should be a JSON object
        // Session.set(data);
        _.each(data, function(item) {
          // console.log(item.title);
          Vids.upsert(item.url, {
            $set: {
              url: item.url,
              title: item.title,
              slug: makeSlug(item.title),
              desc: item.desc,
              date: item.date,
              special: true,
              thumb: item.thumb,
              thumbLg: item.thumbLg
            },
            $addToSet : {
              listId: item.listId
            }
          }, true);
        });
      }
    });


    Meteor.call("wp", function(error, results) {
      if (error) {
        console.log(error);
      } else {
        let data = JSON.parse(results.content); //results.data should be a JSON object
        // Session.set(data);
        _.each(data, function(item) {
          // let featImg = item.featured_image_url;
          // let newFeatImg = featImg.replace("/upload/","/upload/c_fill,dpr_2.0,f_auto,fl_lossy.progressive,h_124,q_70,w_220/");
          let featImg = item.better_featured_image.media_details.sizes.thumbnail.source_url;
          // console.log(item.title.rendered);
          Posts.upsert(item.id, {
            $set: {
              // _id: item.id,
              postId: item.id,
              title: item.title.rendered,
              slug: makeSlug(item.title.rendered),
              date: item.date,
              thumb: featImg,
              excerpt: item.excerpt.rendered,
              // content: item.content.rendered,
              sticky: item.false,
              link: item.link
            }
          }, true);
        });
      }
    });
  }, {
      minute: 35
  });

  // Function once Meteor starts up
  Meteor.startup(function() {

  });

}
