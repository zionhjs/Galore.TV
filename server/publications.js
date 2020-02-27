Meteor.publish('posts', function() {
    return Posts.find({});
});

Meteor.publish('vids', function() {
    return Vids.find({});
});

Meteor.publish('video', function(slug) {
    return Vids.find({"slug": slug});
});

Meteor.publish('shows', function() {
    return Shows.find({});
});

Meteor.publish('show', function(slug) {
    return Shows.find({"slug": slug});
});

// Count documents in Vids
// Meteor.publish('getMyCounters', function () {
// 	new Counter('total-vids', Posts.find());
// });

Meteor.publish('emojis', function() {
  // Here you can choose to publish a subset of all emojis
  // if you'd like to.
  return Emojis.find();
});