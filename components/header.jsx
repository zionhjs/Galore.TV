Header = React.createClass({

  render() {

    let homeLink = FlowRouter.path("home", {});

    let browseLink = FlowRouter.path("browse", {});

    return (
      <div itemScope="itemscope" itemType="http://schema.org/Article">

        <nav className="navbar-default navbar-fixed-top" itemScope="itemscope" itemType="http://schema.org/Article">
          <div className="container noPadding">
            <div className="col-sm-12 col-lg-12 col-lg-offset-0 noPadding">
              <div className="pull-left">
                <a id="menuToggle" onClick={this.props.togglePopup} className="btn btn-default"><i className="fa fa-navicon"></i> SHOWS</a>
              </div>

              <div className="pull-left hidden-xs">
                <a href="javascript:;" id="browseButton" href={browseLink} className="btn btn-default">BROWSE</a>
              </div>

              <div className="mainLogo center-block">
                <div className="logoBackground"></div>
                <a className="logo" href={homeLink}><span>TV</span></a>
              </div>

              <div className="pull-right">
                <a href="http://couch.galoremag.com" id="couchLink" className="btn btn-default" target="_blank">Couch <span className="hidden-xs">Mode</span> <span className="badge">New</span></a>
                <a href="https://youtube.com/galoremag" className="btn btn-primary" target="_blank">Subscribe <i className="fa fa-youtube-play hidden-xs"></i></a>
              </div>
            </div>
          </div>
        </nav>

      </div>
    );
  }

});
