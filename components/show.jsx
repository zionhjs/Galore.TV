ShowSub = new SubsManager();
VidSub = new SubsManager();

Show = React.createClass({

  getInitialState() {
      return {
        show: null,
        vids: []
      }
  },

  componentWillMount() {
      return {
        show: this.props.show,
        vids: this.props.vids
      }
  },

  renderMoreLink() {
    return (
      <a className="seeMore">
        <i className="fa fa-arrow-right"></i>
      </a>
    )
  },

  renderVidGrid() {
    return this.props.vids.map((vid) => {
      return <VidBox key={vid.id} vid={vid} />;
    });
  },

  renderVidList() {
    return this.props.vids.map((vid) => {
      return <VidSnippet key={vid.id} vid={vid} />;
    });
  },

  componentDidMount() {
    let show = this.props.show.url,
        metaDesc = this.props.show.desc,
        ogTitle = this.props.show.title + " 💅🏾 GaloreTV",
        ogDesc = this.props.show.desc,
        ogType = "show.movie",
        ogUrl = "http://tv.galoremag.com/show/" + this.props.show.slug,
        ogImage = this.props.show.thumbLg;


    let player, iframe;

    // Meta data

    let title = this.props.show.title + " 💅🏾 GaloreTV";

    DocHead.setTitle(title + " 💅🏾 GaloreTV");

    let canonical = {rel: "canonical", href: ogUrl};
        metaDesc = {name: "description", content: metaDesc},
        ogTitleMeta = {property: "og:title", content: ogTitle},
        ogDescMeta = {property: "og:description", content: ogDesc},
        ogTypeMeta = {property: "og:type", content: ogType},
        ogUrlMeta = {property: "og:url", content: ogUrl},
        ogImageMeta = {property: "og:image:secure_url", content: ogImage};

    let twitterCard = {name: "twitter:card", content: "summary"},
        twitterDesc = {name: "twitter:description", content: ogDesc},
        twitterTitle = {name: "twitter:title", content: ogTitle},
        twitterSite = {name: "twitter:site", content: "@thegaloremag"},
        twitterImage = {name: "twitter:image", content: ogImage},
        twitterCreator = {name: "twitter:creator", content: "@thegaloremag"};

    DocHead.addLink(canonical);
    DocHead.addMeta(metaDesc);
    DocHead.addMeta(ogTitleMeta);
    DocHead.addMeta(ogDescMeta);
    DocHead.addMeta(ogTypeMeta);
    DocHead.addMeta(ogUrlMeta);
    DocHead.addMeta(ogImageMeta);
  },

  facebookShare() {
      window.open('https://www.facebook.com/sharer/sharer.php?u=http://tv.galoremag.com/show/'+this.props.show.slug,'Share this post on Facebook','width=600,height=400');
  },

  twitterShare() {
      window.open('https://twitter.com/share?url=http://tv.galoremag.com/show/'+this.props.show.slug,'Tweet this post','width=600,height=400');
  },

  showImgResp() {
      if (Meteor.Device.isPhone()) {
        return this.props.show.thumb;
      } else {
        return this.props.show.thumbLg;
      }
  },

  render() {

    // let showHero = {
    //   backgroundImage: 'url(' + this.props.show.thumbLg + ')',
    //   backgroundPosition: 'center center',
    //   backgroundSize: 'cover'
    // };

    // let showCover = this.props.show.thumbLg;

    return (

      <div id="contentContainer" className="container-fluid noPadding" itemScope="itemscope" itemType="http://schema.org/TVSeries">

        <div id="showHero" className="col-sm-12 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1 noPadding">
          <div className="noPadding">
            <img src={this.showImgResp()} itemProp="thumbnailUrl"></img>
          </div>

          <div id="showDetails">
            <div id="showShare" className="col-md-3 text-center">
                <ul id="shareButtons" className="list-inline">
                    <li><a className="share-facebook" href="javascript:;" target="popup" onClick={this.facebookShare}><i className="fa fa-facebook"></i></a></li>
                    <li><a className="share-facebook" href="javascript:;" target="popup" onClick={this.twitterShare}><i className="fa fa-twitter"></i></a></li>
                    <li><a href="mailto:friend@galoremag.com?subject=UGGHHH%3A%20FIRE.%20Seen%20on%20GaloreTV&amp;body=Whoa, %20check%20this%20amazing%20video%20out%20on%20GaloreTV"><i className="fa fa-envelope"></i></a></li>
                </ul>
            </div>
            <div id="showInfo" className="col-md-9">
              <h3 itemProp="name">{this.props.show.title}</h3>
              <p itemProp="description">{this.props.show.desc}</p>
            </div>
          </div>
        </div>

        <div id="mainContent" className="col-sm-12 col-lg-12 col-lg-offset-0">

          {/* Comment */}

          <h3>
            <flag>All Episodes</flag>
          </h3>

          <div className="gridList container hidden-xs">
              {this.renderVidGrid()}
          </div>

          <div className="horizontalList visible-xs">
              {this.renderVidList()}
          </div>

          <div>
            <Footer />
          </div>

        </div>

      </div>

    );
  }
});

ShowWrapper = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        let data = { vids: [], show: null},
            handles = [ShowSub.subscribe("show", this.props.slug),
                       VidSub.subscribe("vids")];
        if (!handles.every(utils.isReady)) {
            data.loading = true;
            return data;
        } else {

            let show = Shows.findOne({"slug": this.props.slug});

            let vids = Vids.find({
                "listId": show._id,
                "title": {$nin: ["Private video", "Deleted video"]}
            }, {
                sort: {
                    date: -1
                }
            }).fetch();

            data.show = show;
            data.vids = vids;
        }
        return data;
    },

    render(){
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

      return(
          <Show key={this.data.show._id} show={this.data.show} vids={this.data.vids} {...this.props} />
      )
    }
});
