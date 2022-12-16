/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageBox from "sap/m/MessageBox";
import { Octokit } from "@octokit/core";
import {
  initializeApp,
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
} from "githubfollower/lib/firebase";
import Fragment from "sap/ui/core/Fragment";
import FilterOperator from "sap/ui/model/FilterOperator";
import Token from "sap/m/Token";
import Filter from "sap/ui/model/Filter";

/**
 * @namespace de.marianzeis.githubfollower.controller
 */
export default class Main extends BaseController {
  public async loadSAPData(): void {
    let data = [];
    this.getModel("data").setProperty("/busySAPButton", true);
    this.getModel("data").setProperty("/busyOPMLButton", true);
    try {
      const functions = getFunctions(this.app);
      // connectFunctionsEmulator(functions, "localhost", 5001);
      console.log(functions);
      const addMessage = httpsCallable(functions, "helloWorld");
      const sapUsername = this.getModel("data").getProperty(
        "/SAPCommunityUsername"
      );
	  if(!sapUsername || sapUsername === ""){
		this.getModel("data").setProperty("/busySAPButton", false);
		this.getModel("data").setProperty("/busyOPMLButton", false);
		MessageBox.error("SAP Username is empty")
		return;
	}
      const response = await addMessage({ userName: sapUsername });
      data = JSON.parse(response.data);
      console.log(data);
    } catch (error) {
		this.getModel("data").setProperty("/busySAPButton", false);
		this.getModel("data").setProperty("/busyOPMLButton", false);
      MessageBox.error("Error while loading SAP Data (maybe User not found)");
	  return;
    }
    this.getModel("data").setProperty("/SAPFollowing", data.list_items);
	this.getModel("data").setProperty("/typeSAPButton", "Success");
    this.getModel("data").setProperty("/busySAPButton", false);
	this.getModel("data").setProperty("/busyOPMLButton", false);
	this.getModel("data").setProperty("/OPMLButtonEnabled", true);
  }

  public onInit(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyCy1d13pYC79sOgUZnn4-sJ5VM9QY6TjqM",
      authDomain: "github-followers-281ea.firebaseapp.com",
      projectId: "github-followers-281ea",
      storageBucket: "github-followers-281ea.appspot.com",
      messagingSenderId: "576057379323",
      appId: "1:576057379323:web:4fb59feea548cdefa1235e",
    };

    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);

    // // // Initialize Firebase Authentication and get a reference to the service
    this.auth = getAuth(this.app);
    this.provider = new GithubAuthProvider();
    this.provider.setCustomParameters({
      allow_signup: "false",
    });
    this.token = "";

    // create Jsonmodel
    this.getView().setModel(
      new JSONModel({
        token: "",
        busyOPMLButton: false,
		typeGitHubButton : "Default",
		typeSAPButton : "Default",
		OPMLButtonEnabled: false
      }),
      "data"
    );
  }

  public signInToGitHub(): void {
    this.githubSignInPopup(this.provider);
  }

  public async loadGitHubData(): Promise<void> {
    this.getModel("data").setProperty("/busyGitHubButton", true);
	this.getModel("data").setProperty("/busyOPMLButton", true);
	
    const githubUsername = this.getModel("data").getProperty("/gitHubUsername");
	if(!githubUsername || githubUsername === ""){
		this.getModel("data").setProperty("/busyGitHubButton", false);
		this.getModel("data").setProperty("/busyOPMLButton", false);
		MessageBox.error("GitHub Username is empty")
		return;
	}
    let page = 1;
    let followers = [];
    let following = [];
    const octokit = new Octokit({
      throttle: {
        onRateLimit: (retryAfter: any, options: any) => {
          this.octokit.log.warn(
            `Request quota exhausted for request ${options.method} ${options.url}`
          );

          // Retry four times after hitting a rate limit error, then give up
          if (options.request.retryCount <= 4) {
            console.log(`Retrying after ${retryAfter} seconds!`);
            return true;
          }
        },
        onAbuseLimit: (retryAfter: any, options: any) => {
          // does not retry, only logs a warning
          this.octokit.log.warn(
            `Abuse detected for request ${options.method} ${options.url}`
          );
        },
      },
    });
    let resultFollowing: any;
    try {
      resultFollowing = await octokit.request(
        `GET /users/${githubUsername}/following`
      );
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.status === 404) {
		this.getModel("data").setProperty("/busyGitHubButton", false);
		this.getModel("data").setProperty("/busyOPMLButton", false);
        MessageBox.error(`User ${githubUsername} not found`);
      } else {
		this.getModel("data").setProperty("/busyGitHubButton", false);
		this.getModel("data").setProperty("/busyOPMLButton", false);
        MessageBox.error(error.message);
      }
    }
    following = resultFollowing.data;
    while (resultFollowing.data.length >= 30) {
      page += 1;
      resultFollowing = await octokit.request(
        `GET /users/${githubUsername}/following`,
        { page: page }
      );
      following = [...following, ...resultFollowing.data];
    }
    this.getModel("data").setProperty("/GitHubFollowing", following);
	this.getModel("data").setProperty("/typeGitHubButton", "Success");
    this.getModel("data").setProperty("/busyGitHubButton", false);
	this.getModel("data").setProperty("/busyOPMLButton", false);
	this.getModel("data").setProperty("/OPMLButtonEnabled", true);
    // MessageBox.success("Your OPML file is ready!");
  }

  public opml(): void {
    const GitHubFollowing =
      this.getModel("data").getProperty("/GitHubFollowing") || [];
    const SAPFollowing =
      this.getModel("data").getProperty("/SAPFollowing") || [];
    const SAPBlogs = this.byId("multiInput").getTokens();
    let outlinesGitHub = [];
    let outlinesSAP = [];
    let outlinesSAPBlogs = [];
    var header = {
      title: "title-text",
      dateCreated: new Date(2014, 2, 9),
      ownerName: "azu",
    };
    for (var i = 0; i < GitHubFollowing.length; i++) {
      outlinesGitHub.push({
        text: GitHubFollowing[i].login,
        title: GitHubFollowing[i].login,
        type: "rss",
        xmlUrl: GitHubFollowing[i].html_url + ".atom",
        htmlUrl: GitHubFollowing[i].html_url,
      });
    }
    for (var i = 0; i < SAPFollowing.length; i++) {
      outlinesSAP.push({
        text: SAPFollowing[i].fullName,
        title: SAPFollowing[i].fullName,
        type: "rss",
        xmlUrl: `https://content.services.sap.com/feed?author=${SAPFollowing[i].userName}`,
        htmlUrl: SAPFollowing[i].profileUrl,
      });
    }
    for (var i = 0; i < SAPBlogs.length; i++) {
      outlinesSAPBlogs.push({
        text: SAPBlogs[i].getText(),
        title: SAPBlogs[i].getText(),
        type: "rss",
        xmlUrl: `https://content.services.sap.com/feed?type=blogpost&amp;tags=${SAPBlogs[i].getKey()}`,
        htmlUrl: `https://blogs.sap.com/tags/${SAPBlogs[i].getKey()}`,
      });
    }
    let headerXML =
      "<head><title>Sample OPML file for RSSReader</title></head>";
    let outlinesXMLGitHub = [];
    let outlinesXMLSAP = [];
    let outlinesXMLSAPBlogs = [];
    for (let i = 0; i < outlinesGitHub.length; i++) {
      let outlinesXML =
        '<outline text="' +
        outlinesGitHub[i].text +
        '" title="' +
        outlinesGitHub[i].title +
        '" type="' +
        outlinesGitHub[i].type +
        '" xmlUrl="' +
        outlinesGitHub[i].xmlUrl +
        '" htmlUrl="' +
        outlinesGitHub[i].htmlUrl +
        '" />';
      outlinesXMLGitHub.push(outlinesXML);
    }
    for (let i = 0; i < outlinesSAP.length; i++) {
      let outlinesXML =
        '<outline text="' +
        outlinesSAP[i].text +
        '" title="' +
        outlinesSAP[i].title +
        '" type="' +
        outlinesSAP[i].type +
        '" xmlUrl="' +
        outlinesSAP[i].xmlUrl +
        '" htmlUrl="' +
        outlinesSAP[i].htmlUrl +
        '" />';
      outlinesXMLSAP.push(outlinesXML);
    }
    for (let i = 0; i < outlinesSAPBlogs.length; i++) {
      let outlinesXML =
        '<outline text="' +
        outlinesSAPBlogs[i].text +
        '" title="' +
        outlinesSAPBlogs[i].title +
        '" type="' +
        outlinesSAPBlogs[i].type +
        '" xmlUrl="' +
        outlinesSAPBlogs[i].xmlUrl +
        '" htmlUrl="' +
        outlinesSAPBlogs[i].htmlUrl +
        '" />';
      outlinesXMLSAPBlogs.push(outlinesXML);
    }
    let outlinesXML = "";
    if (outlinesXMLSAP.length > 0) {
      outlinesXML =
        '<outline text="SAP Community Following" title="SAP Community Following">' +
        outlinesXMLSAP +
        " </outline>";
    }
    if (outlinesXMLGitHub.length > 0) {
      outlinesXML =
        outlinesXML +
        '<outline text="GitHub Following" title="GitHub Following">' +
        outlinesXMLGitHub +
        " </outline>";
    }
    if (outlinesXMLSAPBlogs.length > 0) {
      outlinesXML =
        outlinesXML +
        '<outline text="SAP Blogs" title="SAP Blogs">' +
        outlinesXMLSAPBlogs +
        " </outline>";
    }
    let xml =
      '<?xml version="1.0" encoding="UTF-8"?><opml version="2.0">' +
      headerXML +
      "<body>" +
      outlinesXML +
      "</body>" +
      "</opml>";
    this.downloadFile("opml.xml", xml);
  }
  public githubSignInPopup(provider): void {
    // [START auth_github_signin_popup]
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */

        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        this.token = result._tokenResponse.oauthAccessToken;
        this.getModel("data").setProperty("/token", this.token);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    // [END auth_github_signin_popup]
  }

  public downloadFile(filename, text): void {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  public handleValueHelp(oEvent): any {
    var sInputValue = oEvent.getSource().getValue(),
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
      oValueHelpDialog.getBinding("items").filter([new Filter(
        "title",
        FilterOperator.Contains,
        sInputValue
      )]);
	  let aSorter = [];

            aSorter.push(new sap.ui.model.Sorter("count", true));
	  oValueHelpDialog.getBinding("items").sort(aSorter)
      // open value help dialog filtered by the input value
      oValueHelpDialog.open(sInputValue);
    });
  }

  public _handleValueHelpSearch(evt):any {
    var sValue = evt.getParameter("value");
    var oFilter = new Filter(
      "title",
      FilterOperator.Contains,
      sValue
    );
    var oddIdFilter = new Filter({
      path: 'title',
      test: function(value) {
          return value.toLowerCase().indexOf(sValue.toLowerCase()) !== -1
      }
  });
    evt.getSource().getBinding("items").filter(oddIdFilter);
  }

  public onTokenUpdate(evt):any {
    this.getModel("data").setProperty("/OPMLButtonEnabled", true);
  }

  public _handleValueHelpClose(evt):any {
    this.getModel("data").setProperty("/OPMLButtonEnabled", true);
    var aSelectedItems = evt.getParameter("selectedItems"),
      oMultiInput = this.byId("multiInput");

    if (aSelectedItems && aSelectedItems.length > 0) {
      aSelectedItems.forEach(function (oItem) {
        oMultiInput.addToken(new Token({
          text: oItem.getTitle(),
          key: oItem.getBindingContext("tags").getObject().tag
        }));
      });
    }
  }

}
