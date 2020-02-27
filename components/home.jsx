VidSub = new SubsManager();
PostSub = new SubsManager();

Home = React.createClass({

  renderVids() {
    if (!this.props.vids) {
      return;
    } else {
      return this.props.vids.map((vid) => {
        return <VidSnippet key={vid.url} vid={vid} />;
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

  renderPosts() {
    if (!this.props.posts) {

    } else {
      return this.props.posts.map((post) => {
        return <PostSnippet key={post._id} post={post} />;
      });
    }
  },

  renderSlides() {
    if(!this.props.featured) {
      return;
    } else {
      return this.props.featured.map((slide) => {
        return <Slide key={slide.url} slide={slide} />;
      });
    }
  },

  getInitialState() {
    return {
      vids:[],
      exclusives: [],
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

  browseShowsLink() {
    FlowRouter.go("/browse/shows");
  },

  browseAllLink() {
    FlowRouter.go("/browse/all");
  },

  showLink(linkSlug) {
    let params = {slug: linkSlug};

    let link = FlowRouter.path("show", params);

    return link;
  },

  componentDidMount() {

    DocHead.setTitle("GaloreTV 💅🏾 Video for The Modern Girl");

    let canonical = {rel: "canonical", href: "http://tv.galoremag.com"},
        metaTitle = {name: "title", content: "GaloreTV 💅🏾 Video for The Modern Girl"},
        metaInfo = {name: "description", content: "Videos On Fashion, Beauty, Sex, Dating, Bombshells, Celebrities, Music, & Pop Culture For The Modern Girl"},
        ogTitleMeta = {property: "og:title", content: "GaloreTV 💅🏾 Video for The Modern Girl"},
        ogDescMeta = {property: "og:description", content: "Videos On Fashion, Beauty, Sex, Dating, Bombshells, Celebrities, Music, & Pop Culture For The Modern Girl"},
        ogTypeMeta = {property: "og:type", content: "website"},
        ogUrlMeta = {property: "og:url", content: "http://tv.galoremag.com"},
        ogImageMeta = {property: "og:image:secure_url", content: "http://tv.galoremag.com/img/galoretv_cover.jpg"},
        ogImageWidth = {property: "og:image:width", content: "600"},
        ogImageHeight = {property: "og:image:height", content: "405"};

    let twitterCard = {name: "twitter:card", content: "summary"},
        twitterDesc = {name: "twitter:description", content: "Videos on Fashion, Beauty, Sex, Dating, Bombshells, Celebrities, Music, & Pop Culture For The Modern Girl"},
        twitterTitle = {name: "twitter:title", content: "GaloreTV 💅🏾 Video For The Modern Girl"},
        twitterSite = {name: "twitter:site", content: "@thegaloremag"},
        twitterImage = {name: "twitter:image", content: "http://tv.galoremag.com/img/galoretv_cover.jpg"},
        twitterCreator = {name: "twitter:creator", content: "@thegaloremag"};

    DocHead.addMeta(metaTitle);
    DocHead.addMeta(metaInfo);
    DocHead.addMeta(ogTitleMeta);
    DocHead.addMeta(ogDescMeta);
    DocHead.addMeta(ogTypeMeta);
    DocHead.addMeta(ogUrlMeta);
    DocHead.addMeta(ogImageMeta);
    DocHead.addMeta(ogImageWidth);
    DocHead.addMeta(ogImageHeight);

    DocHead.addMeta(twitterCard);
    DocHead.addMeta(twitterDesc);
    DocHead.addMeta(twitterTitle);
    DocHead.addMeta(twitterSite);
    DocHead.addMeta(twitterImage);
    DocHead.addMeta(twitterCreator);

    $('#featuredSlider').owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      // navText: [&#x27;next&#x27;,&#x27;prev&#x27;],
      navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
      // transitionStyle: "fade"
      autoplay: true
    });
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

        <div id="heroContainer" className="col-sm-12 col-lg-12 col-lg-offset-0">
          <div id="slider">
            <div id="featuredSlider" className="owl-carousel">
              {this.props.featured ? this.renderSlides() : <div className="loader">Loading...</div>}
            </div>
          </div>
        </div>

        <div id="mainContent" className="col-sm-12 col-lg-12 col-lg-offset-0">

          <div className="contentArea">
            <h3>
              <a href="javascript:;" onClick={this.browseAllLink}><flag>The Latest <i className="fa fa-angle-right"></i></flag></a>
            </h3>
            <div id="latest" className="horizontalList">
              {this.renderVids()}

              <a href="javascript:;" onClick={this.browseAllLink} className="snippet last">
                <div className="seeMore">
                  <i className="fa fa-arrow-right"></i>
                </div>
                <h5>See More</h5>
              </a>

            </div>
          </div>

          <div className="contentArea">
            <h3>
              <a href={this.showLink("exclusives")}><flag>Exclusives <i className="fa fa-angle-right"></i></flag></a>
            </h3>
            <div className="horizontalList">
              {this.renderExclusives()}

              <a href={this.showLink("exclusives")} className="snippet last">
                <div className="seeMore">
                  <i className="fa fa-arrow-right"></i>
                </div>
                <h5>See More</h5>
              </a>

            </div>
          </div>

          <div className="featArea">
            <h3>
              <a href={this.showLink("originals")}><flag>Originals <i className="fa fa-angle-right"></i></flag></a>
            </h3>
            <div className="horizontalList">
              {this.renderOriginals()}

              <a href={this.showLink("originals")} className="snippet last">
                <div className="seeMore">
                  <i className="fa fa-arrow-right"></i>
                </div>
                <h5>See More</h5>
              </a>

            </div>
          </div>

          <div className="featArea">
            <h3>
              <a href="http://galoremag.com" target="_blank"><flag>Something to Read? <i className="fa fa-angle-right"></i></flag></a>
            </h3>
            <div className="horizontalList">
              {this.renderPosts()}

              <a href="https://galoremag.com" target="_blank" className="snippet last">
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

HomeWrapper = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {

    let data = {},
        handles = [VidSub.subscribe("vids"),
                   PostSub.subscribe("posts")];
    if (!handles.every(utils.isReady)) {
        data.loading = true;
        return data;
    } else {
        let vids = Vids.find({
          originals: {$nin: [true]},
          title: {$nin: ['Private video', 'Deleted video']}
        }, {
            sort: {
                date: -1
            }, limit: 20
        }).fetch();

        let featured = Vids.find({
          featured: true,
          title: {$nin: ['Private video', 'Deleted video']}
        }, {
            sort: {
                date: -1
            }
        }).fetch();

        let exclusives = Vids.find({
          listId: "PLx0X0-cKhSOBXGK3Yr11j1HLa_ccrNO2G",
          title: {$nin: ['Private video', 'Deleted video']}
        }, {
            sort: {
                date: -1
            }, limit: 20
        }).fetch();

        let originals = Vids.find({
          listId: "PLx0X0-cKhSOAwWv_GDzenSU3y4WmJn680",
          title: {$nin: ['Private video', 'Deleted video']}
        }, {
            sort: {
                date: -1
            }, limit: 20
        }).fetch();

        let posts = Posts.find({}, {
            sort: {
                date: -1
            }, limit: 20
        }).fetch();

        // data.showExclusives = showExclusives;
        // data.showOriginals = showOriginals;
        data.vids = vids;
        data.posts = posts;
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
      <Home
        key={11}
        vids={this.data.vids}
        featured={this.data.featured}
        exclusives={this.data.exclusives}
        originals={this.data.originals}
        posts={this.data.posts}
        {...this.props}
      />
    )
  }

});
