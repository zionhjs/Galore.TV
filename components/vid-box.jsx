VidBox = React.createClass({

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
      <a href={vidLink} className="box col-sm-6 col-md-4 col-lg-3" itemProp="url">
        <div className="boxPic">
          <img src={this.props.vid.thumb} itemProp="thumbnailUrl"></img>
        </div>
        <div className="boxDetails">
          <h5 className="text" itemProp="name">{cleanTitle}</h5>
          <p className="date" itemProp="dateCreated">Posted {this.formatDate()}</p>
        </div>
      </a>
    );
  }
});
