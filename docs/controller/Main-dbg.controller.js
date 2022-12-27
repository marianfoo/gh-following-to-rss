sap.ui.define(["./BaseController", "sap/ui/model/json/JSONModel", "sap/m/MessageBox", "@octokit/core", "githubfollower/lib/firebase", "sap/ui/core/Fragment", "sap/ui/model/FilterOperator", "sap/m/Token", "sap/ui/model/Filter", "sap/ui/model/Sorter", "sap/ui/core/util/File", "sap/m/library"], function (__BaseController, JSONModel, MessageBox, ___octokit_core, __githubfollower_lib_firebase, Fragment, FilterOperator, Token, Filter, Sorter, File, sap_m_library) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  /* eslint-disable @typescript-eslint/no-unsafe-call */
  /* eslint-disable no-mixed-spaces-and-tabs */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable @typescript-eslint/restrict-plus-operands */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const BaseController = _interopRequireDefault(__BaseController);
  const Octokit = ___octokit_core["Octokit"];
  const initializeApp = __githubfollower_lib_firebase["initializeApp"];
  const getAuth = __githubfollower_lib_firebase["getAuth"];
  const GithubAuthProvider = __githubfollower_lib_firebase["GithubAuthProvider"];
  const signInWithPopup = __githubfollower_lib_firebase["signInWithPopup"];
  const getFunctions = __githubfollower_lib_firebase["getFunctions"];
  const httpsCallable = __githubfollower_lib_firebase["httpsCallable"];
  const ButtonType = sap_m_library["ButtonType"];
  /**
   * @namespace de.marianzeis.githubfollower.controller
   */
  const Main = BaseController.extend("de.marianzeis.githubfollower.controller.Main", {
    loadSAPData: async function _loadSAPData() {
      let data = [];
      this._dataModel.setProperty("/busySAPButton", true);
      this._dataModel.setProperty("/busyOPMLButton", true);
      try {
        const functions = getFunctions(this.app);
        // connectFunctionsEmulator(functions, "localhost", 5001);
        console.log(functions);
        const addMessage = httpsCallable(functions, "helloWorld");
        const sapUsername = this._dataModel.getProperty("/SAPCommunityUsername");
        if (!sapUsername || sapUsername === "") {
          this._dataModel.setProperty("/busySAPButton", false);
          this._dataModel.setProperty("/busyOPMLButton", false);
          MessageBox.error("SAP Username is empty");
          return;
        }
        const response = await addMessage({
          userName: sapUsername
        });
        data = JSON.parse(response.data);
        console.log(data);
      } catch (error) {
        this._dataModel.setProperty("/busySAPButton", false);
        this._dataModel.setProperty("/busyOPMLButton", false);
        MessageBox.error("Error while loading SAP Data (maybe User not found)");
        return;
      }
      this._dataModel.setProperty("/SAPFollowing", data.list_items);
      this._dataModel.setProperty("/typeSAPButton", ButtonType.Success);
      this._dataModel.setProperty("/busySAPButton", false);
      this._dataModel.setProperty("/busyOPMLButton", false);
      this._dataModel.setProperty("/OPMLButtonEnabled", true);
    },
    onInit: function _onInit() {
      const firebaseConfig = {
        apiKey: "AIzaSyCy1d13pYC79sOgUZnn4-sJ5VM9QY6TjqM",
        authDomain: "github-followers-281ea.firebaseapp.com",
        projectId: "github-followers-281ea",
        storageBucket: "github-followers-281ea.appspot.com",
        messagingSenderId: "576057379323",
        appId: "1:576057379323:web:4fb59feea548cdefa1235e"
      };

      // Initialize Firebase
      this.app = initializeApp(firebaseConfig);

      // // // Initialize Firebase Authentication and get a reference to the service
      this.auth = getAuth(this.app);
      this.provider = new GithubAuthProvider();
      this.provider.setCustomParameters({
        allow_signup: "false"
      });
      this.token = "";
      this._dataModel = new JSONModel({
        token: "",
        busyOPMLButton: false,
        typeGitHubButton: "Default",
        typeSAPButton: "Default",
        OPMLButtonEnabled: false
      }, true);
      this.getView().setModel(this._dataModel, "data");
    },
    signInToGitHub: function _signInToGitHub() {
      this.githubSignInPopup(this.provider);
    },
    loadGitHubData: async function _loadGitHubData() {
      this._dataModel.setProperty("/busyGitHubButton", true);
      this._dataModel.setProperty("/busyOPMLButton", true);
      const githubUsername = this.getModel("data").getProperty("/gitHubUsername");
      if (!githubUsername || githubUsername === "") {
        this._dataModel.setProperty("/busyGitHubButton", false);
        this._dataModel.setProperty("/busyOPMLButton", false);
        MessageBox.error("GitHub Username is empty");
        return;
      }
      let page = 1;
      const followers = [];
      let following = [];
      const octokit = new Octokit({
        throttle: {
          onRateLimit: (retryAfter, options) => {
            this.octokit.log.warn(`Request quota exhausted for request ${options.method} ${options.url}`);

            // Retry four times after hitting a rate limit error, then give up
            if (options.request.retryCount <= 4) {
              console.log(`Retrying after ${retryAfter} seconds!`);
              return true;
            }
          },
          onAbuseLimit: (retryAfter, options) => {
            // does not retry, only logs a warning
            this.octokit.log.warn(`Abuse detected for request ${options.method} ${options.url}`);
          }
        }
      });
      let resultFollowing;
      try {
        resultFollowing = await octokit.request(`GET /users/${githubUsername}/following`);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (error.status === 404) {
          this._dataModel.setProperty("/busyGitHubButton", false);
          this._dataModel.setProperty("/busyOPMLButton", false);
          MessageBox.error(`User ${githubUsername} not found`);
        } else {
          this._dataModel.setProperty("/busyGitHubButton", false);
          this._dataModel.setProperty("/busyOPMLButton", false);
          MessageBox.error(error.message);
        }
      }
      following = resultFollowing.data;
      while (resultFollowing.data.length >= 30) {
        page += 1;
        resultFollowing = await octokit.request(`GET /users/${githubUsername}/following`, {
          page: page
        });
        following = [...following, ...resultFollowing.data];
      }
      this._dataModel.setProperty("/GitHubFollowing", following);
      this._dataModel.setProperty("/typeGitHubButton", ButtonType.Success);
      this._dataModel.setProperty("/busyGitHubButton", false);
      this._dataModel.setProperty("/busyOPMLButton", false);
      this._dataModel.setProperty("/OPMLButtonEnabled", true);
      // MessageBox.success("Your OPML file is ready!");
    },
    opml: function _opml() {
      const GitHubFollowing = this._dataModel.getProperty("/GitHubFollowing") || [];
      const SAPFollowing = this._dataModel.getProperty("/SAPFollowing") || [];
      const SAPBlogs = this.byId("multiInput").getTokens();
      const SAPGroups = this.byId("multiInputGroup").getTokens();
      const SAPYoutube = this.byId("multiInputYoutube").getTokens();
      const SAPPodcasts = this.byId("multiInputSAPPodcasts").getTokens();
      const SAPEvents = this.byId("SAPEventCheckbox").getSelected();
      const outlinesGitHub = [];
      const outlinesSAP = [];
      const outlinesSAPBlogs = [];
      const outlinesSAPGroups = [];
      const outlinesSAPYoutube = [];
      const outlinesSAPPodcasts = [];
      const header = {
        title: "title-text",
        dateCreated: new Date(2014, 2, 9),
        ownerName: "azu"
      };
      for (let i = 0; i < GitHubFollowing.length; i++) {
        outlinesGitHub.push({
          text: GitHubFollowing[i].login,
          title: GitHubFollowing[i].login,
          type: "rss",
          xmlUrl: GitHubFollowing[i].html_url + ".atom",
          htmlUrl: GitHubFollowing[i].html_url
        });
      }
      for (let i = 0; i < SAPFollowing.length; i++) {
        outlinesSAP.push({
          text: SAPFollowing[i].fullName,
          title: SAPFollowing[i].fullName,
          type: "rss",
          xmlUrl: `https://content.services.sap.com/feed?author=${SAPFollowing[i].userName}`,
          htmlUrl: SAPFollowing[i].profileUrl
        });
      }
      for (let i = 0; i < SAPBlogs.length; i++) {
        outlinesSAPBlogs.push({
          text: SAPBlogs[i].getText(),
          title: SAPBlogs[i].getText(),
          type: "rss",
          xmlUrl: `https://content.services.sap.com/feed?type=blogpost&amp;tags=${SAPBlogs[i].getKey()}`,
          htmlUrl: `https://blogs.sap.com/tags/${SAPBlogs[i].getKey()}`
        });
      }
      for (let i = 0; i < SAPGroups.length; i++) {
        // remove forum or blog in the end of string
        const htmlKey = SAPGroups[i].getKey().replace(/blog|forum$/, "");
        outlinesSAPGroups.push({
          text: SAPGroups[i].getText(),
          title: SAPGroups[i].getText(),
          type: "rss",
          xmlUrl: `https://groups.community.sap.com/khhcw49343/rss/board?board.id=${SAPGroups[i].getKey()}-board&amp;interaction.style=forum&amp;feeds.replies=true`,
          htmlUrl: `https://groups.community.sap.com/t5/${htmlKey}/gh-p/${htmlKey}`
        });
      }
      for (let i = 0; i < SAPYoutube.length; i++) {
        outlinesSAPYoutube.push({
          text: SAPYoutube[i].getText(),
          title: SAPYoutube[i].getText(),
          type: "rss",
          xmlUrl: `https://www.youtube.com/feeds/videos.xml?channel_id=${SAPYoutube[i].getKey()}`,
          htmlUrl: `https://www.youtube.com/channel/${SAPYoutube[i].getKey()}`
        });
      }
      for (let i = 0; i < SAPPodcasts.length; i++) {
        outlinesSAPPodcasts.push({
          text: SAPPodcasts[i].getText(),
          title: SAPPodcasts[i].getText(),
          type: "rss",
          xmlUrl: `https://podcast.opensap.info/${SAPPodcasts[i].getKey()}/feed/mp3/`,
          htmlUrl: `https://podcast.opensap.info/${SAPPodcasts[i].getKey()}/`
        });
      }
      const headerXML = "<head><title>Sample OPML file for RSSReader</title></head>";
      const outlinesXMLGitHub = this._generateOpmlLine(outlinesGitHub);
      const outlinesXMLSAP = this._generateOpmlLine(outlinesSAP);
      const outlinesXMLSAPBlogs = this._generateOpmlLine(outlinesSAPBlogs);
      const outlinesXMLSAPGroups = this._generateOpmlLine(outlinesSAPGroups);
      const outlinesXMLSAPYoutube = this._generateOpmlLine(outlinesSAPYoutube);
      const outlinesXMLSAPPodcasts = this._generateOpmlLine(outlinesSAPPodcasts);
      let outlinesXML = "";
      if (outlinesXMLSAP.length > 0) {
        outlinesXML = '<outline text="SAP Community Following" title="SAP Community Following">' + outlinesXMLSAP + " </outline>";
      }
      if (outlinesXMLGitHub.length > 0) {
        outlinesXML = outlinesXML + '<outline text="GitHub Following" title="GitHub Following">' + outlinesXMLGitHub + " </outline>";
      }
      if (outlinesXMLSAPBlogs.length > 0) {
        outlinesXML = outlinesXML + '<outline text="SAP Blogs" title="SAP Blogs">' + outlinesXMLSAPBlogs + " </outline>";
      }
      if (outlinesXMLSAPGroups.length > 0) {
        outlinesXML = outlinesXML + '<outline text="SAP Groups" title="SAP Groups">' + outlinesXMLSAPGroups + " </outline>";
      }
      if (SAPEvents) {
        outlinesXML = outlinesXML + '<outline text="SAP Group Events" title="SAP Group Events">' + '<outline text="SAP Group Events' + '" title="SAP Group Events' + '" type="rss' + '" xmlUrl="https://groups.community.sap.com/khhcw49343/rss/Category?category.id=events&amp;interaction.style=occasion' + '" htmlUrl="https://groups.community.sap.com/t5/events/ct-p/events' + '" />' + " </outline>";
      }
      if (outlinesXMLSAPYoutube.length > 0) {
        outlinesXML = outlinesXML + '<outline text="SAP Youtube Channels" title="SAP Youtube Channels">' + outlinesXMLSAPYoutube + " </outline>";
      }
      if (outlinesXMLSAPPodcasts.length > 0) {
        outlinesXML = outlinesXML + '<outline text="SAP Podcasts" title="SAP Podcasts">' + outlinesXMLSAPPodcasts + " </outline>";
      }
      const xml = '<?xml version="1.0" encoding="UTF-8"?><opml version="2.0">' + headerXML + "<body>" + outlinesXML + "</body>" + "</opml>";
      this.downloadFile("opml", xml);
    },
    githubSignInPopup: function _githubSignInPopup(provider) {
      // [START auth_github_signin_popup]
      const auth = getAuth();
      signInWithPopup(auth, provider).then(result => {
        /** @type {firebase.auth.OAuthCredential} */

        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        this.token = result._tokenResponse.oauthAccessToken;
        this._dataModel.setProperty("/token", this.token);
        // ...
      }).catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
      // [END auth_github_signin_popup]
    },
    downloadFile: function _downloadFile(filename, filecontent) {
      File.save(filecontent, filename, "xml", "text/plain", "utf-8");
    },
    handleValueHelp: function _handleValueHelp(oEvent) {
      const sInputValue = oEvent.getSource().getValue(),
        oView = this.getView();

      // create value help dialog
      if (!this._pValueHelpDialog) {
        this._pValueHelpDialog = Fragment.load({
          id: oView.getId(),
          name: "de.marianzeis.githubfollower.view.Dialog",
          controller: this
        }).then(function (oValueHelpDialog) {
          oView.addDependent(oValueHelpDialog);
          return oValueHelpDialog;
        });
      }
      this._pValueHelpDialog.then(function (oValueHelpDialog) {
        // create a filter for the binding
        oValueHelpDialog.getBinding("items").filter([new Filter("title", FilterOperator.Contains, sInputValue)]);
        const aSorter = [];
        aSorter.push(new Sorter("count", true));
        oValueHelpDialog.getBinding("items").sort(aSorter);
        // open value help dialog filtered by the input value
        oValueHelpDialog.open(sInputValue);
      });
    },
    _handleValueHelpSearch: function _handleValueHelpSearch(evt) {
      const sValue = evt.getParameter("value");
      const oddIdFilter = new Filter({
        path: "title",
        test: function (value) {
          return value.toLowerCase().indexOf(sValue.toLowerCase()) !== -1;
        }
      });
      evt.getSource().getBinding("items").filter(oddIdFilter);
    },
    onTokenUpdate: function _onTokenUpdate(evt) {
      this._dataModel.setProperty("/OPMLButtonEnabled", true);
    },
    _handleValueHelpClose: function _handleValueHelpClose(evt) {
      this._dataModel.setProperty("/OPMLButtonEnabled", true);
      const aSelectedItems = evt.getParameter("selectedItems"),
        oMultiInput = this.byId("multiInput");
      if (aSelectedItems && aSelectedItems.length > 0) {
        aSelectedItems.forEach(function (oItem) {
          oMultiInput.addToken(new Token({
            text: oItem.getTitle(),
            key: oItem.getBindingContext("tags").getObject().tag
          }));
        });
      }
    },
    handleValueHelpGroup: function _handleValueHelpGroup(oEvent) {
      const sInputValue = oEvent.getSource().getValue(),
        oView = this.getView();

      // create value help dialog
      if (!this._pValueHelpDialogGroup) {
        this._pValueHelpDialogGroup = Fragment.load({
          id: oView.getId(),
          name: "de.marianzeis.githubfollower.view.DialogGroup",
          controller: this
        }).then(function (oValueHelpDialogGroup) {
          oView.addDependent(oValueHelpDialogGroup);
          return oValueHelpDialogGroup;
        });
      }
      this._pValueHelpDialogGroup.then(function (oValueHelpDialogGroup) {
        // create a filter for the binding
        oValueHelpDialogGroup.getBinding("items").filter([new Filter("title", FilterOperator.Contains, sInputValue)]);
        const aSorter = [];
        aSorter.push(new Sorter("count", true));
        oValueHelpDialogGroup.getBinding("items").sort(aSorter);
        // open value help dialog filtered by the input value
        oValueHelpDialogGroup.open(sInputValue);
      });
    },
    _handleValueHelpSearchGroup: function _handleValueHelpSearchGroup(evt) {
      const sValue = evt.getParameter("value");
      const oddIdFilter = new Filter({
        path: "title",
        test: function (value) {
          return value.toLowerCase().indexOf(sValue.toLowerCase()) !== -1;
        }
      });
      evt.getSource().getBinding("items").filter(oddIdFilter);
    },
    onTokenUpdateGroup: function _onTokenUpdateGroup() {
      this._dataModel.setProperty("/OPMLButtonEnabled", true);
    },
    onGithubUserNameInputEnter: async function _onGithubUserNameInputEnter() {
      await this.loadGitHubData();
    },
    onSAPCommunityUserNameInputEnter: async function _onSAPCommunityUserNameInputEnter() {
      await this.loadSAPData();
    },
    _handleValueHelpCloseGroup: function _handleValueHelpCloseGroup(evt) {
      this._dataModel.setProperty("/OPMLButtonEnabled", true);
      const aSelectedItems = evt.getParameter("selectedItems"),
        oMultiInput = this.byId("multiInputGroup");
      if (aSelectedItems && aSelectedItems.length > 0) {
        aSelectedItems.forEach(function (oItem) {
          oMultiInput.addToken(new Token({
            text: oItem.getTitle(),
            key: oItem.getBindingContext("groups").getObject().tag
          }));
        });
      }
    },
    handleValueHelpYoutube: function _handleValueHelpYoutube(oEvent) {
      const sInputValue = oEvent.getSource().getValue(),
        oView = this.getView();

      // create value help dialog
      if (!this._pValueHelpDialogYoutube) {
        this._pValueHelpDialogYoutube = Fragment.load({
          id: oView.getId(),
          name: "de.marianzeis.githubfollower.view.DialogYoutube",
          controller: this
        }).then(function (oValueHelpDialogYoutube) {
          oView.addDependent(oValueHelpDialogYoutube);
          return oValueHelpDialogYoutube;
        });
      }
      this._pValueHelpDialogYoutube.then(function (oValueHelpDialogYoutube) {
        // create a filter for the binding
        oValueHelpDialogYoutube.getBinding("items").filter([new Filter("title", FilterOperator.Contains, sInputValue)]);
        oValueHelpDialogYoutube.open(sInputValue);
      });
    },
    _handleValueHelpSearchYoutube: function _handleValueHelpSearchYoutube(evt) {
      const sValue = evt.getParameter("value");
      const oddIdFilter = new Filter({
        path: "title",
        test: function (value) {
          return value.toLowerCase().indexOf(sValue.toLowerCase()) !== -1;
        }
      });
      evt.getSource().getBinding("items").filter(oddIdFilter);
    },
    onTokenUpdateYoutube: function _onTokenUpdateYoutube(evt) {
      this._dataModel.setProperty("/OPMLButtonEnabled", true);
    },
    _handleValueHelpCloseYoutube: function _handleValueHelpCloseYoutube(evt) {
      this._dataModel.setProperty("/OPMLButtonEnabled", true);
      const aSelectedItems = evt.getParameter("selectedItems"),
        oMultiInput = this.byId("multiInputYoutube");
      if (aSelectedItems && aSelectedItems.length > 0) {
        aSelectedItems.forEach(function (oItem) {
          oMultiInput.addToken(new Token({
            text: oItem.getTitle(),
            key: oItem.getBindingContext("youtube").getObject().id
          }));
        });
      }
    },
    handleValueHelpSAPPodcasts: function _handleValueHelpSAPPodcasts(oEvent) {
      const sInputValue = oEvent.getSource().getValue(),
        oView = this.getView();

      // create value help dialog
      if (!this._pValueHelpDialogSAPPodcasts) {
        this._pValueHelpDialogSAPPodcasts = Fragment.load({
          id: oView.getId(),
          name: "de.marianzeis.githubfollower.view.DialogSAPPodcasts",
          controller: this
        }).then(function (oValueHelpDialogSAPPodcasts) {
          oView.addDependent(oValueHelpDialogSAPPodcasts);
          return oValueHelpDialogSAPPodcasts;
        });
      }
      this._pValueHelpDialogSAPPodcasts.then(function (oValueHelpDialogSAPPodcasts) {
        // create a filter for the binding
        oValueHelpDialogSAPPodcasts.getBinding("items").filter([new Filter("title", FilterOperator.Contains, sInputValue)]);
        oValueHelpDialogSAPPodcasts.open(sInputValue);
      });
    },
    _handleValueHelpSearchSAPPodcasts: function _handleValueHelpSearchSAPPodcasts(evt) {
      const sValue = evt.getParameter("value");
      const oddIdFilter = new Filter({
        path: "title",
        test: function (value) {
          return value.toLowerCase().indexOf(sValue.toLowerCase()) !== -1;
        }
      });
      evt.getSource().getBinding("items").filter(oddIdFilter);
    },
    onTokenUpdateSAPPodcasts: function _onTokenUpdateSAPPodcasts(evt) {
      this._dataModel.setProperty("/OPMLButtonEnabled", true);
    },
    _handleValueHelpCloseSAPPodcasts: function _handleValueHelpCloseSAPPodcasts(evt) {
      this._dataModel.setProperty("/OPMLButtonEnabled", true);
      const aSelectedItems = evt.getParameter("selectedItems"),
        oMultiInput = this.byId("multiInputSAPPodcasts");
      if (aSelectedItems && aSelectedItems.length > 0) {
        aSelectedItems.forEach(function (oItem) {
          oMultiInput.addToken(new Token({
            text: oItem.getTitle(),
            key: oItem.getBindingContext("sap-podcasts").getObject().key
          }));
        });
      }
    },
    onCheckboxSelected: function _onCheckboxSelected() {
      this._dataModel.setProperty("/OPMLButtonEnabled", true);
    },
    _generateOpmlLine: function _generateOpmlLine(array) {
      const outlines = [];
      for (let i = 0; i < array.length; i++) {
        const outlinesXML = '<outline text="' + array[i].text + '" title="' + array[i].title + '" type="' + array[i].type + '" xmlUrl="' + array[i].xmlUrl + '" htmlUrl="' + array[i].htmlUrl + '" />';
        outlines.push(outlinesXML);
      }
      return outlines;
    }
  });
  return Main;
});
//# sourceMappingURL=Main.controller.js.map