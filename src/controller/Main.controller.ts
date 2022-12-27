/* eslint-disable @typescript-eslint/no-unsafe-call */
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
import MultiInput from "sap/m/MultiInput";
import CheckBox from "sap/m/CheckBox";
import Event from "sap/ui/base/Event";
import Sorter from "sap/ui/model/Sorter";
import File from "sap/ui/core/util/File";
import { ButtonType } from "sap/m/library";
import SelectDialog from "sap/m/SelectDialog";
import ListBinding from "sap/ui/model/ListBinding";

/**
 * @namespace de.marianzeis.githubfollower.controller
 */
export default class Main extends BaseController {
  private _dataModel: JSONModel;
  public async loadSAPData(): Promise<void> {
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
      const response = await addMessage({ userName: sapUsername });
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

    this._dataModel = new JSONModel(
      {
        token: "",
        busyOPMLButton: false,
        typeGitHubButton: "Default",
        typeSAPButton: "Default",
        OPMLButtonEnabled: false,
      },
      true
    );
    this.getView().setModel(this._dataModel, "data");
  }

  public signInToGitHub(): void {
    this.githubSignInPopup(this.provider);
  }

  public async loadGitHubData(): Promise<void> {
    this._dataModel.setProperty("/busyGitHubButton", true);
    this._dataModel.setProperty("/busyOPMLButton", true);

    const githubUsername = <string>(
      this.getModel("data").getProperty("/gitHubUsername")
    );
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
      resultFollowing = await octokit.request(
        `GET /users/${githubUsername}/following`,
        { page: page }
      );
      following = [...following, ...resultFollowing.data];
    }
    this._dataModel.setProperty("/GitHubFollowing", following);
    this._dataModel.setProperty("/typeGitHubButton", ButtonType.Success);
    this._dataModel.setProperty("/busyGitHubButton", false);
    this._dataModel.setProperty("/busyOPMLButton", false);
    this._dataModel.setProperty("/OPMLButtonEnabled", true);
    // MessageBox.success("Your OPML file is ready!");
  }

  public opml(): void {
    const GitHubFollowing =
      this._dataModel.getProperty("/GitHubFollowing") || [];
    const SAPFollowing = this._dataModel.getProperty("/SAPFollowing") || [];
    const SAPBlogs = (this.byId("multiInput") as MultiInput).getTokens();
    const SAPGroups = (this.byId("multiInputGroup") as MultiInput).getTokens();
    const SAPYoutube = (
      this.byId("multiInputYoutube") as MultiInput
    ).getTokens();
    const SAPPodcasts = (
      this.byId("multiInputSAPPodcasts") as MultiInput
    ).getTokens();
    const SAPEvents = (this.byId("SAPEventCheckbox") as CheckBox).getSelected();
    const outlinesGitHub = [];
    const outlinesSAP = [];
    const outlinesSAPBlogs = [];
    const outlinesSAPGroups = [];
    const outlinesSAPYoutube = [];
    const outlinesSAPPodcasts = [];
    const header = {
      title: "title-text",
      dateCreated: new Date(2014, 2, 9),
      ownerName: "azu",
    };
    for (let i = 0; i < GitHubFollowing.length; i++) {
      outlinesGitHub.push({
        text: GitHubFollowing[i].login,
        title: GitHubFollowing[i].login,
        type: "rss",
        xmlUrl: GitHubFollowing[i].html_url + ".atom",
        htmlUrl: GitHubFollowing[i].html_url,
      });
    }
    for (let i = 0; i < SAPFollowing.length; i++) {
      outlinesSAP.push({
        text: SAPFollowing[i].fullName,
        title: SAPFollowing[i].fullName,
        type: "rss",
        xmlUrl: `https://content.services.sap.com/feed?author=${SAPFollowing[i].userName}`,
        htmlUrl: SAPFollowing[i].profileUrl,
      });
    }
    for (let i = 0; i < SAPBlogs.length; i++) {
      outlinesSAPBlogs.push({
        text: SAPBlogs[i].getText(),
        title: SAPBlogs[i].getText(),
        type: "rss",
        xmlUrl: `https://content.services.sap.com/feed?type=blogpost&amp;tags=${SAPBlogs[
          i
        ].getKey()}`,
        htmlUrl: `https://blogs.sap.com/tags/${SAPBlogs[i].getKey()}`,
      });
    }
    for (let i = 0; i < SAPGroups.length; i++) {
      // remove forum or blog in the end of string
      const htmlKey = SAPGroups[i].getKey().replace(/blog|forum$/, "");
      outlinesSAPGroups.push({
        text: SAPGroups[i].getText(),
        title: SAPGroups[i].getText(),
        type: "rss",
        xmlUrl: `https://groups.community.sap.com/khhcw49343/rss/board?board.id=${SAPGroups[
          i
        ].getKey()}-board&amp;interaction.style=forum&amp;feeds.replies=true`,
        htmlUrl: `https://groups.community.sap.com/t5/${htmlKey}/gh-p/${htmlKey}`,
      });
    }
    for (let i = 0; i < SAPYoutube.length; i++) {
      outlinesSAPYoutube.push({
        text: SAPYoutube[i].getText(),
        title: SAPYoutube[i].getText(),
        type: "rss",
        xmlUrl: `https://www.youtube.com/feeds/videos.xml?channel_id=${SAPYoutube[
          i
        ].getKey()}`,
        htmlUrl: `https://www.youtube.com/channel/${SAPYoutube[i].getKey()}`,
      });
    }
    for (let i = 0; i < SAPPodcasts.length; i++) {
      outlinesSAPPodcasts.push({
        text: SAPPodcasts[i].getText(),
        title: SAPPodcasts[i].getText(),
        type: "rss",
        xmlUrl: `https://podcast.opensap.info/${SAPPodcasts[
          i
        ].getKey()}/feed/mp3/`,
        htmlUrl: `https://podcast.opensap.info/${SAPPodcasts[i].getKey()}/`,
      });
    }
    const headerXML =
      "<head><title>Sample OPML file for RSSReader</title></head>";
    const outlinesXMLGitHub = this._generateOpmlLine(outlinesGitHub);
    const outlinesXMLSAP = this._generateOpmlLine(outlinesSAP);
    const outlinesXMLSAPBlogs = this._generateOpmlLine(outlinesSAPBlogs);
    const outlinesXMLSAPGroups = this._generateOpmlLine(outlinesSAPGroups);
    const outlinesXMLSAPYoutube = this._generateOpmlLine(outlinesSAPYoutube);
    const outlinesXMLSAPPodcasts = this._generateOpmlLine(outlinesSAPPodcasts);
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
    if (outlinesXMLSAPGroups.length > 0) {
      outlinesXML =
        outlinesXML +
        '<outline text="SAP Groups" title="SAP Groups">' +
        outlinesXMLSAPGroups +
        " </outline>";
    }
    if (SAPEvents) {
      outlinesXML =
        outlinesXML +
        '<outline text="SAP Group Events" title="SAP Group Events">' +
        '<outline text="SAP Group Events' +
        '" title="SAP Group Events' +
        '" type="rss' +
        '" xmlUrl="https://groups.community.sap.com/khhcw49343/rss/Category?category.id=events&amp;interaction.style=occasion' +
        '" htmlUrl="https://groups.community.sap.com/t5/events/ct-p/events' +
        '" />' +
        " </outline>";
    }
    if (outlinesXMLSAPYoutube.length > 0) {
      outlinesXML =
        outlinesXML +
        '<outline text="SAP Youtube Channels" title="SAP Youtube Channels">' +
        outlinesXMLSAPYoutube +
        " </outline>";
    }
    if (outlinesXMLSAPPodcasts.length > 0) {
      outlinesXML =
        outlinesXML +
        '<outline text="SAP Podcasts" title="SAP Podcasts">' +
        outlinesXMLSAPPodcasts +
        " </outline>";
    }
    const xml =
      '<?xml version="1.0" encoding="UTF-8"?><opml version="2.0">' +
      headerXML +
      "<body>" +
      outlinesXML +
      "</body>" +
      "</opml>";
    this.downloadFile("opml", xml);
  }
  public githubSignInPopup(provider): void {
    // [START auth_github_signin_popup]
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */

        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        this.token = result._tokenResponse.oauthAccessToken;
        this._dataModel.setProperty("/token", this.token);
        // ...
      })
      .catch((error) => {
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
  }

  public downloadFile(filename: string, filecontent: string): void {
    File.save(filecontent, filename, "xml", "text/plain", "utf-8");
  }

  public handleValueHelp(oEvent: Event): any {
    const sInputValue = (oEvent.getSource() as MultiInput).getValue(),
      oView = this.getView();

    // create value help dialog
    if (!this._pValueHelpDialog) {
      this._pValueHelpDialog = Fragment.load({
        id: oView.getId(),
        name: "de.marianzeis.githubfollower.view.Dialog",
        controller: this,
      }).then(function (oValueHelpDialog) {
        oView.addDependent(oValueHelpDialog);
        return oValueHelpDialog;
      });
    }

    this._pValueHelpDialog.then(function (oValueHelpDialog) {
      // create a filter for the binding
      oValueHelpDialog
        .getBinding("items")
        .filter([new Filter("title", FilterOperator.Contains, sInputValue)]);
      const aSorter = [];

      aSorter.push(new Sorter("count", true));
      oValueHelpDialog.getBinding("items").sort(aSorter);
      // open value help dialog filtered by the input value
      oValueHelpDialog.open(sInputValue);
    });
  }

  public _handleValueHelpSearch(evt): any {
    const sValue = evt.getParameter("value");
    const oddIdFilter = new Filter({
      path: "title",
      test: function (value) {
        return value.toLowerCase().indexOf(sValue.toLowerCase()) !== -1;
      },
    });
    evt.getSource().getBinding("items").filter(oddIdFilter);
  }

  public onTokenUpdate(evt): any {
    this._dataModel.setProperty("/OPMLButtonEnabled", true);
  }

  public _handleValueHelpClose(evt: Event): any {
    this._dataModel.setProperty("/OPMLButtonEnabled", true);
    const aSelectedItems = evt.getParameter("selectedItems"),
      oMultiInput = this.byId("multiInput");

    if (aSelectedItems && aSelectedItems.length > 0) {
      aSelectedItems.forEach(function (oItem) {
        oMultiInput.addToken(
          new Token({
            text: oItem.getTitle(),
            key: oItem.getBindingContext("tags").getObject().tag,
          })
        );
      });
    }
  }

  public handleValueHelpGroup(oEvent: Event): any {
    const sInputValue = oEvent.getSource().getValue(),
      oView = this.getView();

    // create value help dialog
    if (!this._pValueHelpDialogGroup) {
      this._pValueHelpDialogGroup = Fragment.load({
        id: oView.getId(),
        name: "de.marianzeis.githubfollower.view.DialogGroup",
        controller: this,
      }).then(function (oValueHelpDialogGroup) {
        oView.addDependent(oValueHelpDialogGroup);
        return oValueHelpDialogGroup;
      });
    }

    this._pValueHelpDialogGroup.then(function (oValueHelpDialogGroup) {
      // create a filter for the binding
      oValueHelpDialogGroup
        .getBinding("items")
        .filter([new Filter("title", FilterOperator.Contains, sInputValue)]);
      const aSorter = [];

      aSorter.push(new Sorter("count", true));
      oValueHelpDialogGroup.getBinding("items").sort(aSorter);
      // open value help dialog filtered by the input value
      oValueHelpDialogGroup.open(sInputValue);
    });
  }

  public _handleValueHelpSearchGroup(evt: Event): void {
    const sValue = evt.getParameter("value");
    const oddIdFilter = new Filter({
      path: "title",
      test: function (value) {
        return value.toLowerCase().indexOf(sValue.toLowerCase()) !== -1;
      },
    });
    ((evt.getSource() as SelectDialog).getBinding("items") as ListBinding).filter(oddIdFilter);
  }

  public onTokenUpdateGroup(): void {
    this._dataModel.setProperty("/OPMLButtonEnabled", true);
  }

  public async onGithubUserNameInputEnter(): Promise<void> {
    await this.loadGitHubData();
  }

  public async onSAPCommunityUserNameInputEnter(): Promise<void> {
    await this.loadSAPData();
  }

  public _handleValueHelpCloseGroup(evt: Event): void {
    this._dataModel.setProperty("/OPMLButtonEnabled", true);
    const aSelectedItems = evt.getParameter("selectedItems"),
      oMultiInput = <MultiInput>this.byId("multiInputGroup");

    if (aSelectedItems && aSelectedItems.length > 0) {
      aSelectedItems.forEach(function (oItem) {
        oMultiInput.addToken(
          new Token({
            text: oItem.getTitle(),
            key: oItem.getBindingContext("groups").getObject().tag,
          })
        );
      });
    }
  }

  public handleValueHelpYoutube(oEvent: Event): void {
    const sInputValue = (oEvent.getSource() as MultiInput).getValue(),
      oView = this.getView();

    // create value help dialog
    if (!this._pValueHelpDialogYoutube) {
      this._pValueHelpDialogYoutube = Fragment.load({
        id: oView.getId(),
        name: "de.marianzeis.githubfollower.view.DialogYoutube",
        controller: this,
      }).then(function (oValueHelpDialogYoutube) {
        oView.addDependent(oValueHelpDialogYoutube);
        return oValueHelpDialogYoutube;
      });
    }

    this._pValueHelpDialogYoutube.then(function (oValueHelpDialogYoutube) {
      // create a filter for the binding
      oValueHelpDialogYoutube
        .getBinding("items")
        .filter([new Filter("title", FilterOperator.Contains, sInputValue)]);
      oValueHelpDialogYoutube.open(sInputValue);
    });
  }

  public _handleValueHelpSearchYoutube(evt: Event): void {
    const sValue = evt.getParameter("value");
    const oddIdFilter = new Filter({
      path: "title",
      test: function (value) {
        return value.toLowerCase().indexOf(sValue.toLowerCase()) !== -1;
      },
    });
    (
      (evt.getSource() as SelectDialog).getBinding("items") as ListBinding
    ).filter(oddIdFilter);
  }

  public onTokenUpdateYoutube(evt): void {
    this._dataModel.setProperty("/OPMLButtonEnabled", true);
  }

  public _handleValueHelpCloseYoutube(evt): void {
    this._dataModel.setProperty("/OPMLButtonEnabled", true);
    const aSelectedItems = evt.getParameter("selectedItems"),
      oMultiInput = this.byId("multiInputYoutube");

    if (aSelectedItems && aSelectedItems.length > 0) {
      aSelectedItems.forEach(function (oItem) {
        oMultiInput.addToken(
          new Token({
            text: oItem.getTitle(),
            key: oItem.getBindingContext("youtube").getObject().id,
          })
        );
      });
    }
  }

  public handleValueHelpSAPPodcasts(oEvent): void {
    const sInputValue = oEvent.getSource().getValue(),
      oView = this.getView();

    // create value help dialog
    if (!this._pValueHelpDialogSAPPodcasts) {
      this._pValueHelpDialogSAPPodcasts = Fragment.load({
        id: oView.getId(),
        name: "de.marianzeis.githubfollower.view.DialogSAPPodcasts",
        controller: this,
      }).then(function (oValueHelpDialogSAPPodcasts) {
        oView.addDependent(oValueHelpDialogSAPPodcasts);
        return oValueHelpDialogSAPPodcasts;
      });
    }

    this._pValueHelpDialogSAPPodcasts.then(function (
      oValueHelpDialogSAPPodcasts
    ) {
      // create a filter for the binding
      oValueHelpDialogSAPPodcasts
        .getBinding("items")
        .filter([new Filter("title", FilterOperator.Contains, sInputValue)]);
      oValueHelpDialogSAPPodcasts.open(sInputValue);
    });
  }

  public _handleValueHelpSearchSAPPodcasts(evt: Event): void {
    const sValue = evt.getParameter("value");
    const oddIdFilter = new Filter({
      path: "title",
      test: function (value) {
        return value.toLowerCase().indexOf(sValue.toLowerCase()) !== -1;
      },
    });
    (
      (evt.getSource() as SelectDialog).getBinding("items") as ListBinding
    ).filter(oddIdFilter);
  }

  public onTokenUpdateSAPPodcasts(evt): void {
    this._dataModel.setProperty("/OPMLButtonEnabled", true);
  }

  public _handleValueHelpCloseSAPPodcasts(evt): void {
    this._dataModel.setProperty("/OPMLButtonEnabled", true);
    const aSelectedItems = evt.getParameter("selectedItems"),
      oMultiInput = <MultiInput>this.byId("multiInputSAPPodcasts");

    if (aSelectedItems && aSelectedItems.length > 0) {
      aSelectedItems.forEach(function (oItem) {
        oMultiInput.addToken(
          new Token({
            text: oItem.getTitle(),
            key: oItem.getBindingContext("sap-podcasts").getObject().key,
          })
        );
      });
    }
  }

  public onCheckboxSelected(): void {
    this._dataModel.setProperty("/OPMLButtonEnabled", true);
  }

  private _generateOpmlLine(array: string | any[]): string[] {
    const outlines = [];
    for (let i = 0; i < array.length; i++) {
      const outlinesXML =
        '<outline text="' +
        array[i].text +
        '" title="' +
        array[i].title +
        '" type="' +
        array[i].type +
        '" xmlUrl="' +
        array[i].xmlUrl +
        '" htmlUrl="' +
        array[i].htmlUrl +
        '" />';
      outlines.push(outlinesXML);
    }
    return outlines;
  }
}
