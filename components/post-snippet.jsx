PostSnippet = React.createClass({

  formatDate() {
    let postDate = this.props.post.date;
    return moment(postDate).fromNow();
  },

  render() {

    let vidLink = this.props.post.link;

    let thumb = this.props.post.thumb;

    let newThumb = thumb.replace(/.*?:\/\//g, "//");

    return (
      <a href={vidLink} className="snippet" target="_blank">
        <div className="vidPic">
          <img src={newThumb}></img>
        </div>
        <div className="vidDetails">
          <h5 className="text" key={this.props.post.id} dangerouslySetInnerHTML={{__html: this.props.post.title}} />
          <p className="date">Posted {this.formatDate()}</p>
        </div>
      </a>
    );
  }
});
