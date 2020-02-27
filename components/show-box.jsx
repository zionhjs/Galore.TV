ShowBox = React.createClass({

  render() {

    let params = {slug: this.props.show.slug};

    let showLink = FlowRouter.path("show", params);

    return (
      <a href={showLink} onClick={this.props.togglePopup} className="showBox col-sm-6 col-md-4 col-lg-3" itemScope="itemscope" itemType="http://schema.org/TVSeries">
        <div className="showBoxPic">
          <img src={this.props.show.thumb} itemProp="thumbnailUrl"></img>
        </div>
        <div className="showBoxDetails">
          <h4 className="text">{this.props.show.title}</h4>
          <p itemProp="description">{this.props.show.desc}</p>
        </div>
      </a>
    );
  }
});
