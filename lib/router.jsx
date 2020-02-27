let pathFor = (path, params) => {
  FlowRouter.watchPathChange();
  let query = params && params.query ? FlowRouter._qs.parse( params.query ) : {};
  return FlowRouter.path( path, params, query );
};

let urlFor = (path, params) => {
  return Meteor.absoluteUrl( pathFor(path, params) );
};

let currentRoute = (route) => {
  FlowRouter.watchPathChange();
  return FlowRouter.current().route.name === route ? 'active' : '';
};

FlowHelpers = {
  pathFor: pathFor,
  urlFor: urlFor,
  currentRoute: currentRoute
};

FlowRouter.route('/', {
  action: function() {
    ReactLayout.render(App, {
      content: <HomeWrapper key={1} />
    });
  },
  name: 'home'
});

// FlowRouter.route('/', {
//   name: 'home',
//   action: function() {
//     ReactLayout.render(App, {
//       content: <Home key={1}/>
//     });
//   },
//   subscriptions: function(params, queryParams) {
//       this.register('posts', Meteor.subscribe('posts'));
//       this.register('items', Meteor.subscribe('items'));
//   }
// });

FlowRouter.route('/video/:slug', {
  action: function(params) {
    ReactLayout.render(App, {
      content: <VideoWrapper key={2} slug={params.slug} />
    });
  },
  name: 'video'
  // triggersEnter: [function(context, redirect) {
  //   console.log('running /video trigger');
  // }]
});

// FlowRouter.route('/video/:id', {
//   action: function(params) {
//     ReactLayout.render(App, {
//       content: <VideoWrapper key={params.id} id={params.id} />
//     });
//   },
//   name: 'video',
//   triggersEnter: [function(context, redirect) {
//     console.log('running /video trigger');
//   }]
// });

FlowRouter.route('/show/:slug', {
  action: function(params) {
    ReactLayout.render(App, {
      content: <ShowWrapper key={3} slug={params.slug} />
    });
  },
  name: 'show'
});

FlowRouter.route('/browse', {
  action: function() {
    ReactLayout.render(App, {
      content: <BrowseWrapper key={4} />
    });
  },
  name: 'browse'
});

FlowRouter.route('/browse/all', {
  action: function() {
    ReactLayout.render(App, {
      content: <AllVidsWrapper key={5} />
    });
  },
  name: 'all'
});

FlowRouter.route('/browse/shows', {
  action: function() {
    ReactLayout.render(App, {
      content: <BrowseShowsWrapper key={6} />
    });
  },
  name: 'shows'
});

FlowRouter.triggers.enter( [ enterFunction ] );
FlowRouter.triggers.exit( [ exitFunction ] );

// var videoRoutes = FlowRouter.group({
//   prefix: '/video',
//   triggersEnter: [reloadPlayer]
// });

// var showRoutes = FlowRouter.group({
//   prefix: '/show',
//   triggersEnter: [reloadPlayer]
// });

function reloadPlayer() {
  YT.load();
}

function enterFunction(context) {
  window.scrollTo(0,0);
  ga('send', 'pageview', context.path);
  DocHead.removeDocHeadAddedTags();
}

function exitFunction() {
}

FlowRouter.notFound = {
    name: '404',
    // Subscriptions registered here don't have Fast Render support.
    subscriptions: function() {

    },
    action: function() {
      ReactLayout.render(App, {
        content: <HomeWrapper />
      });
    }
};
