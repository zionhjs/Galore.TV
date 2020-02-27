VidSub = new SubsManager();
ShowSub = new SubsManager();
ThisVidSub = new SubsManager();

Video = React.createClass({

    getInitialState() {
        return {
          video: null,
          allVids: [],
          show: [],
          vids: []
        }
    },

    // componentWillMount() {
    //     return {
    //         allVids: this.props.allVids,
    //         video: this.props.video,
    //         vids: this.props.vids,
    //         show: this.props.show
    //     }
    // },

    componentDidMount() {
        let video = this.props.video.url,
            ogTitle = this.props.video.title + " 💅🏾 GaloreTV",
            ogDesc = this.props.video.desc,
            ogType = "video.movie",
            ogUrl = "http://tv.galoremag.com/video/" + this.props.video.slug,
            ogImage = this.props.video.thumbLg;


        let player, iframe;

        // Meta data

        let canonical = {rel: "canonical", href: ogUrl};
            metaTitle = {name: "description", content: ogTitle},
            ogDesc = {name: "description", content: ogDesc},
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

        DocHead.setTitle(ogTitle + " 💅🏾 GaloreTV");
        DocHead.addLink(canonical);
        DocHead.addMeta(metaTitle);
        DocHead.addMeta(ogDesc);
        DocHead.addMeta(ogTitleMeta);
        DocHead.addMeta(ogDescMeta);
        DocHead.addMeta(ogTypeMeta);
        DocHead.addMeta(ogUrlMeta);
        DocHead.addMeta(ogImageMeta);

        onYouTubeIframeAPIReady = function () {
            player = new YT.Player("videoFrame", {
                height: '125%',
                width: '125%',
                playerVars: {
                    // Mute enables autoplay but..
                    // 'mute': 1,
                    'autoplay': 1,
                    'controls': 0,
                    'rel': 0,
                    'autohide':1,
                    'showinfo': 0,
                    'modestbranding': 1,
                    'playsinline': 1,
                    'enablejsapi': 1,
                    'wmode':'opaque',
                    'iv_load_policy': 3,
                    // 'origin': 'http://tv.galoremag.com',
                    'loop': 1
                },

                videoId: video,

                events: {
                    'onReady': initialize,
                    'onStateChange': onPlayerStateChange
                }
            });
        };

        function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.PLAYING) {
                $('#videoFrame').css({'opacity':'1'})
            }
            if (event.data == YT.PlayerState.ENDED) {
                $('#videoFrame').css({'opacity':'0'})
            }

            PlayerState = event.data;
        }

        function updateTimerDisplay(){
            $('#currentTime').text(formatTime( player.getCurrentTime() ));
            $('#duration').text(formatTime( player.getDuration() ));
        }

        function formatTime(time){
            time = Math.round(time);

            var minutes = Math.floor(time / 60),
            seconds = time - minutes * 60;

            seconds = seconds < 10 ? '0' + seconds : seconds;

            return minutes + ":" + seconds;
        }

        function updateProgressBar(){
            $('#progressBar').val((player.getCurrentTime() / player.getDuration()) * 100);
        }

        function updateElapsed() {
            $('#elapsed').width((player.getCurrentTime() / player.getDuration()) *100 + '%');
        }

        function setupListener() {
            document.getElementById('fullscreen').addEventListener('click', playFullscreen);
        }

        function playFullscreen() {
            player.playVideo();

            var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
            if (requestFullScreen) {
                requestFullScreen.bind(iframe)();
            }
        }

        function setupPlayer() {
            document.getElementById("progressBar").addEventListener("mouseup", function(e) {
                let newTime = player.getDuration() * (e.target.value / 100);

                player.seekTo(newTime, true);
            });

            document.getElementById("mute").addEventListener("mouseup", function(e) {
                if (player.isMuted()) {
                    player.unMute();

                } else {
                    player.mute();

                }
            });

            document.getElementById("fullscreen").addEventListener("click", playFullscreen);

            document.getElementById("videoHover").addEventListener("click", function(e) {
                if (PlayerState == 1) {
                    player.pauseVideo();
                } else {
                    player.playVideo();
                }
            });
        }

        function initialize(event){

            var player = event.target;
            iframe = document.getElementById('videoFrame');

            var time_update_interval;

            // Update the controls on load
            updateTimerDisplay();
            // updateProgressBar();

            // Clear any old interval.
            clearInterval(time_update_interval);

            // Start interval to update elapsed time display and
            // the elapsed part of the progress bar every second.
            time_update_interval = setInterval(function () {
                updateTimerDisplay();
                updateProgressBar();
                updateElapsed();
            }, 100);

            setupPlayer();

            // event.target.setVolume(100);
            // event.target.playVideo();

        }

        YT.load();
    },

    // componentWillReceiveProps() {
    //     YT.load();
    // },

    // shouldComponentUpdate() {
    //     YT.load();
    // },

    componentWillUnmount() {
        // document.getElementById("progressBar").removeEventListener("mouseup", false);
        // document.getElementById("fullscreen").removeEventListener("mouseup", false);
        // document.getElementById("mute").removeEventListener("mouseup", false);
    },

    _toggleMute() {
        this.setState({ isMute: !this.state.isMute });
    },

    _renderMute() {
        if(!this.state.isMute) {
            return (
                <i className="fa fa-volume-up"></i>
            );
        } else {
            return (
                <i className="fa fa-volume-off"></i>
            );
        }
    },

    renderVids() {
        return this.props.allVids.map((vid) => {
            return <VidSnippet key={vid.id} vid={vid} />;
        });
    },

    link(linkSlug) {
        let params = {slug: linkSlug};

        let link = FlowRouter.path("show", params);

        return link;
    },

    getRelated() {
        let related = Vids.find({
            "title": {$nin: ["Private video", "Deleted video"]},
            "listId":this.props.video.listId
        }, {
            sort: {
                date: -1
            }
        }).fetch();
        return related.map((vid) => {
            return <VidSnippet key={vid.id} vid={vid} />;
        });
    },

    formatDate() {
        let videoDate = this.props.video.date;
        return moment(videoDate).fromNow();
    },

    facebookShare() {
        window.open('https://www.facebook.com/sharer/sharer.php?u=http://tv.galoremag.com/video/'+this.props.video.slug,'Share this post on Facebook','width=600,height=400');
    },

    twitterShare() {
        window.open('https://twitter.com/share?url=http://tv.galoremag.com/video/'+this.props.video.slug,'Tweet this post','width=600,height=400');
    },

    mobilePlayer() {
      if (Meteor.Device.isPhone() || Meteor.Device.isTablet()) {
        return null;
      } else {
        return <div id="videoHover"></div>;
      }
    },

    render() {
        let title = this.props.video.title,
            cleanTitle = title.replace(" | Galore TV","");

        return (

            <div id="contentContainer" className="container-fluid noPadding" itemScope="itemscope" itemType="http://schema.org/Episode">

                <div id="mainVid" className="col-sm-12 col-lg-12 col-lg-offset-0 noPadding">
                    <div id="videoContainer" className="col-sm-8 noPadding">
                        {this.mobilePlayer()}
                        <div id="videoFrame"></div>
                        <div id="videoControls">
                            <div id="mute" className="pull-left" onClick={this._toggleMute}>{this._renderMute()}</div>
                            <div id="currentTime" className="pull-left"></div>
                            <div id="progress" className="pull-left">
                                <div id="elapsed" className="pull-left"></div>
                                <input type="range" id="progressBar"></input>
                            </div>

                            <div id="fullscreen"><i className="fa fa-expand"></i></div>
                            <div id="duration"></div>
                        </div>
                    </div>

                    <div id="vidInfo" className="col-sm-4">
                        <div id="vidShare">
                            <ul id="shareButtons" className="list-inline text-center">
                                <li><a className="share-facebook" href="javascript:;" target="popup" onClick={this.facebookShare} title="Share on Facebook"><i className="fa fa-facebook"></i></a></li>
                                <li><a className="share-twitter" href="javascript:;" target="popup" onClick={this.twitterShare} title="Share on Twitter"><i className="fa fa-twitter"></i></a></li>
                                <li><a href="mailto:friend@galoremag.com?subject=UGGHHH%3A%20FIRE.%20Seen%20on%20GaloreTV&amp;body=Whoa, %20check%20this%20amazing%20video%20out%20on%20GaloreTV" title="Share with an Email"><i className="fa fa-envelope"></i></a></li>
                            </ul>
                        </div>

                        <hr></hr>

                        <h3 itemProp="name">{cleanTitle}</h3>
                        <h5 itemProp="dateCreated">{this.formatDate()}</h5>
                        <p itemProp="description">{this.props.video.desc}</p>

                        <hr></hr>

                        <p>You are watching:</p>
                        <h4 itemProp="show"><a href={this.link(this.props.show.slug)} title={this.props.show.title}><span className="badge">{this.props.show.title}</span></a></h4>
                    </div>
                </div>

                <div id="mainContent" className="col-sm-12 col-lg-12 col-lg-offset-0">

                    <h3>
                      <a href={this.link(this.props.show.slug)}><flag>More Episodes <i className="fa fa-angle-right"></i></flag></a>
                    </h3>
                    <div className="horizontalList">
                    {this.getRelated()}

                    <a href={this.link(this.props.show.slug)} title={this.props.show.title} className="snippet last">
                        <div className="seeMore">
                          <i className="fa fa-arrow-right"></i>
                        </div>
                        <h5>See More</h5>
                    </a>

                    </div>

                    <h3><flag>Everything Else</flag></h3>
                    <div className="horizontalList">
                    {this.renderVids()}

                    <a href="/browse/all" className="snippet last">
                        <div className="seeMore">
                          <i className="fa fa-arrow-right"></i>
                        </div>
                        <h5>See More</h5>
                    </a>

                    </div>

                    <div>
                        <Footer />
                    </div>

                </div>

            </div>

        );
    },

});

VideoWrapper = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        let data = { vids: [], show: null, video: null},
            handles = [ThisVidSub.subscribe("video", this.props.slug),
                       ShowSub.subscribe("shows"),
                       VidSub.subscribe("vids")];
        if (!handles.every(utils.isReady)) {
            data.loading = true;
            return data;
        } else {
            let video = Vids.findOne({slug: this.props.slug});

            if (!video) {
              return data;
            } else {
              let show = Shows.findOne({$or: [{_id: video.listId[0]}, {}]});

              let vids = Vids.find({
                  "listId": show._id,
                  "title": {$nin: ["Private video", "Deleted video"]}
              }, {
                  sort: {
                      date: -1
                  }
              }).fetch();

              let allVids = Vids.find({
                  "title": {$nin: ["Private video", "Deleted video"]}
              }, {
                  sort: {
                      date: -1
                  },
                  limit: 20
              }).fetch();

              data.allVids = allVids;
              data.video = video;
              data.show = show;
              data.vids = vids;
            }
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

        if (this.data.video) {
          return (
              <Video key={this.data.video._id} vids={this.data.vids} allVids={this.data.allVids} video={this.data.video} show={this.data.show} {...this.props} />
          )
        } else {
          return (
              <HomeWrapper />
          )
        }
    }
});
