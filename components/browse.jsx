VidSub = new SubsManager();
ShowSub = new SubsManager();

Browse = React.createClass({

  renderShows() {
    if (!this.props.shows) {
      return;
    } else {
      return this.props.shows.map((show) => {
        return <ShowBox key={show.url} show={show} />;
      });
    }
  },

  renderVids() {
    if (!this.props.vids) {
      return;
    } else {
      return this.props.vids.map((vid) => {
        return <VidBox key={vid.url} vid={vid} />;
      });
    }
  },

  renderExclusives() {
    if (!this.props.exclusives) {
      return;
    } else {
      return this.props.exclusives.map((vid) => {
        return <VidSnippet key={vid.url} vid={vid} />;
      });
    }
  },

  renderOriginals() {
    if (!this.props.originals) {

    } else {
      return this.props.originals.map((vid) => {
        return <VidSnippet key={vid.url} vid={vid} />;
      });
    }
  },

  browseAllLink() {
    FlowRouter.go("/browse/all");
  },

  browseShowsLink() {
    FlowRouter.go("/browse/shows");
  },

  showLink(linkSlug) {
    let params = {slug: linkSlug};

    let link = FlowRouter.path("show", params);

    return link;
  },

  getInitialState() {
    return {
      shows: [],
      vids:[],
      exclusives: [],
      showExclusives: [],
      featured: [],
      originals: []
    }
  },

  componentWillMount() {
    // this.setState(data);
  },

  // componentWillMount() {
  //   $('.owl-carousel').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
  //   $('.owl-carousel').find('.owl-stage-outer').children().unwrap();
  // },

  componentDidMount() {
  },

  render() {

    // if (this.data.loading) {
    //     return (
    //         <div className="loader-container">
    //             <div className="loader">
    //                 <p><i className="fa fa-venus fa-spin fa-2x"></i></p>
    //                 <p>Loading</p>
    //             </div>
    //         </div>
    //     )
    // }

    return (

      <div id="contentContainer" className="container-fluid noPadding">

        <div id="mainContent" className="col-sm-12 col-lg-12 col-lg-offset-0">

          <div className="contentArea">
            <h3>
              <a href="javascript:;" onClick={this.browseShowsLink}><flag>New Shows <i className="fa fa-angle-right"></i></flag></a>
            </h3>
            <div id="shows" className="gridList container">
              {this.renderShows()}
            </div>
          </div>

          <div className="contentArea">
            <h3>
              <a href="javascript:;" onClick={this.browseAllLink}><flag>The Latest <i className="fa fa-angle-right"></i></flag></a>
            </h3>
            <div id="latest" className="gridList container">
              {this.renderVids()}
            </div>
          </div>

          <div className="contentArea">
            <h3>
              <a href={this.showLink(this.props.showExclusives.slug)}><flag>Exclusives <i className="fa fa-angle-right"></i></flag></a>
            </h3>
            <div className="horizontalList">
              {this.renderExclusives()}

              <a href={this.showLink(this.props.showExclusives.slug)} className="snippet last">
                <div className="seeMore">
                  <i className="fa fa-arrow-right"></i>
                </div>
                <h5>See More</h5>
              </a>

            </div>
          </div>

          <div className="featArea">
            <h3>
              <a href={this.showLink(this.props.showOriginals.slug)}><flag>Originals <i className="fa fa-angle-right"></i></flag></a>
            </h3>
            <div className="horizontalList">
              {this.renderOriginals()}

              <a href={this.showLink(this.props.showOriginals.slug)} className="snippet last">
                <div className="seeMore">
                  <i className="fa fa-arrow-right"></i>
                </div>
                <h5>See More</h5>
              </a>

            </div>
          </div>

          <div>
            <Footer />
          </div>

        </div>

      </div>

    );
  }
});

BrowseWrapper = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {

    let data = { shows: [], vids: [], originals: [] },
        handles = [VidSub.subscribe("vids"),
                   ShowSub.subscribe("shows")];
    if (!handles.every(utils.isReady)) {
        data.loading = true;
        return data;
    } else {
        let shows = Shows.find({}, {
          sort: {
            date: -1
          }, limit: 4
        }).fetch();

        let vids = Vids.find({
          originals: {$nin: [true]},
          'title': {$nin: ['Private video', 'Deleted video']}
        }, {
            sort: {
                date: -1
            }, limit: 6
        }).fetch();

        let featured = Vids.find({
          featured: true,
          'title': {$nin: ['Private video', 'Deleted video']}
        }, {
            sort: {
                date: -1
            }
        }).fetch();

        let showExclusives = Shows.findOne({title:"Exclusives"});
        let showOriginals = Shows.findOne({title:"Originals"});

        let exclusives = Vids.find({
          listId: showExclusives._id,
          'title': {$nin: ['Private video', 'Deleted video']}
        }, {
            sort: {
                date: -1
            }, limit: 20
        }).fetch();

        let originals = Vids.find({
          listId: showOriginals._id,
          'title': {$nin: ['Private video', 'Deleted video']}
        }, {
            sort: {
                date: -1
            }, limit: 20
        }).fetch();

        data.shows = shows;
        data.showExclusives = showExclusives;
        data.showOriginals = showOriginals;
        data.vids = vids;
        data.featured = featured;
        data.exclusives = exclusives;
        data.originals = originals;
    }
    return data;

  },

  render() {

    if (this.data.loading) {
        return (
          <div className="loader-container">
              <div className="loader">
                  <p><i className="fa fa-transgender-alt fa-spin fa-2x"></i></p>
                  <p>Loading...</p>
              </div>
          </div>
        )
    }

    return (
      <Browse
        key={15}
        shows={this.data.shows}
        vids={this.data.vids}
        featured={this.data.featured}
        showExclusives={this.data.showExclusives}
        showOriginals={this.data.showOriginals}
        exclusives={this.data.exclusives}
        originals={this.data.originals}
        {...this.props}
      />
    )
  }

});
