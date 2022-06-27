sap.ui.define(["./BaseController", "sap/ui/model/json/JSONModel", "sap/m/MessageBox", "@octokit/core", "githubfollower/lib/firebase"], function (__BaseController, JSONModel, MessageBox, ___octokit_core, __githubfollower_lib_firebase) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }

  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const BaseController = _interopRequireDefault(__BaseController);

  const Octokit = ___octokit_core["Octokit"];
  const initializeApp = __githubfollower_lib_firebase["initializeApp"];
  const getAuth = __githubfollower_lib_firebase["getAuth"];
  const GithubAuthProvider = __githubfollower_lib_firebase["GithubAuthProvider"];
  const signInWithPopup = __githubfollower_lib_firebase["signInWithPopup"];
  /**
   * @namespace de.marianzeis.githubfollower.controller
   */

  const Main = BaseController.extend("de.marianzeis.githubfollower.controller.Main", {
    onInit: function _onInit() {
      const firebaseConfig = {
        apiKey: "AIzaSyCy1d13pYC79sOgUZnn4-sJ5VM9QY6TjqM",
        authDomain: "github-followers-281ea.firebaseapp.com",
        projectId: "github-followers-281ea",
        storageBucket: "github-followers-281ea.appspot.com",
        messagingSenderId: "576057379323",
        appId: "1:576057379323:web:4fb59feea548cdefa1235e"
      }; // Initialize Firebase

      this.app = initializeApp(firebaseConfig); // // // Initialize Firebase Authentication and get a reference to the service

      this.auth = getAuth(this.app);
      this.provider = new GithubAuthProvider();
      this.provider.setCustomParameters({
        'allow_signup': 'false'
      });
      this.token = ""; // create Jsonmodel

      this.getView().setModel(new JSONModel({
        token: "",
        busyOPMLButton: false
      }), "data");
    },
    signInToGitHub: function _signInToGitHub() {
      this.githubSignInPopup(this.provider);
    },
    createAndDownloadOPMLFile: async function _createAndDownloadOPMLFile() {
      this.getModel("data").setProperty("/busyOPMLButton", true);
      let page = 1;
      let followers = [];
      let following = [];
      const octokit = new Octokit({
        auth: this.token
      });
      const resultFollowers = await octokit.request('GET /user/followers');
      followers = resultFollowers.data;
      let resultFollowing = await octokit.request('GET /user/following');
      following = resultFollowing.data;

      while (resultFollowing.data.length >= 30) {
        page += 1;
        resultFollowing = await octokit.request('GET /user/following', {
          page: page
        });
        following = [...following, ...resultFollowing.data];
      }

      this.opml(following);
      this.getModel("data").setProperty("/busyOPMLButton", false);
      MessageBox.success("Your OPML file is ready!");
    },
    opml: function _opml(array) {
      let outlines = [];
      var header = {
        "title": "title-text",
        "dateCreated": new Date(2014, 2, 9),
        "ownerName": "azu"
      };

      for (var i = 0; i < array.length; i++) {
        outlines.push({
          "text": array[i].login,
          "title": array[i].login,
          type: "rss",
          "xmlUrl": array[i].html_url + ".atom",
          "htmlUrl": array[i].html_url
        });
      }

      let headerXML = '<head><title>Sample OPML file for RSSReader</title></head>';
      let outlinesXML = [];

      for (let i = 0; i < outlines.length; i++) {
        let outlineXML = '<outline text="' + outlines[i].text + '" title="' + outlines[i].title + '" type="' + outlines[i].type + '" xmlUrl="' + outlines[i].xmlUrl + '" htmlUrl="' + outlines[i].htmlUrl + '" />';
        outlinesXML.push(outlineXML);
      }

      let xml = '<?xml version="1.0" encoding="UTF-8"?><opml version="2.0">' + headerXML + '<body>' + outlinesXML + '</body>' + '</opml>';
      this.downloadFile("opml.xml", xml);
    },
    githubSignInPopup: function _githubSignInPopup(provider) {
      // [START auth_github_signin_popup]
      const auth = getAuth();
      signInWithPopup(auth, provider).then(result => {
        /** @type {firebase.auth.OAuthCredential} */
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        this.token = result._tokenResponse.oauthAccessToken;
        this.getModel("data").setProperty("/token", this.token); // ...
      }).catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message; // The email of the user's account used.

        var email = error.email; // The firebase.auth.AuthCredential type that was used.

        var credential = error.credential; // ...
      }); // [END auth_github_signin_popup]
    },
    downloadFile: function _downloadFile(filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  });
  return Main;
});
//# sourceMappingURL=Main.controller.js.map