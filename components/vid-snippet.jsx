VidSnippet = React.createClass({

  escapeHTML(data) {
      return {__html: data}
  },

  formatDate() {
    let videoDate = this.props.vid.date;
    return moment(videoDate).fromNow();
  },

  render() {

    let title = this.props.vid.title;

    let cleanTitle = title.replace(" | Galore TV","");

    let params = {slug: this.props.vid.slug};

    let vidLink = FlowRouter.path("video", params);

    return (
      <a href={vidLink} className="snippet" itemProp="url">
        <div className="vidPic">
          <img src={this.props.vid.thumb} itemProp="thumbnailUrl"></img>
        </div>
        <div className="vidDetails">
          <h5 className="text" itemProp="name">{cleanTitle}</h5>
          <p className="date">Posted {this.formatDate()}</p>
        </div>
      </a>
    );
  }
});
