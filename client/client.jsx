if (Meteor.isClient) {
  // This code is executed on the client only

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    // ReactDOM.render(<App vids={this.vids} />);

    Meteor.subscribe('emojis');
  });
}
