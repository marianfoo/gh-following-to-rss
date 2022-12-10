sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/m/MessageBox","@octokit/core","githubfollower/lib/firebase"],function(t,e,o,s,l){function a(t){return t&&t.__esModule&&typeof t.default!=="undefined"?t.default:t}const r=a(t);const n=s["Octokit"];const i=l["initializeApp"];const u=l["getAuth"];const d=l["GithubAuthProvider"];const h=l["signInWithPopup"];const p=l["getFunctions"];const g=l["httpsCallable"];const y=r.extend("de.marianzeis.githubfollower.controller.Main",{loadSAPData:async function t(){let e=[];this.getModel("data").setProperty("/busySAPButton",true);this.getModel("data").setProperty("/busyOPMLButton",true);try{const t=p(this.app);console.log(t);const s=g(t,"helloWorld");const l=this.getModel("data").getProperty("/SAPCommunityUsername");if(!l||l===""){this.getModel("data").setProperty("/busySAPButton",false);this.getModel("data").setProperty("/busyOPMLButton",false);o.error("SAP Username is empty");return}const a=await s({userName:l});e=JSON.parse(a.data);console.log(e)}catch(t){this.getModel("data").setProperty("/busySAPButton",false);this.getModel("data").setProperty("/busyOPMLButton",false);o.error("Error while loading SAP Data (maybe User not found)");return}this.getModel("data").setProperty("/SAPFollowing",e.list_items);this.getModel("data").setProperty("/typeSAPButton","Success");this.getModel("data").setProperty("/busySAPButton",false);this.getModel("data").setProperty("/busyOPMLButton",false);this.getModel("data").setProperty("/OPMLButtonEnabled",true)},onInit:function t(){const o={apiKey:"AIzaSyCy1d13pYC79sOgUZnn4-sJ5VM9QY6TjqM",authDomain:"github-followers-281ea.firebaseapp.com",projectId:"github-followers-281ea",storageBucket:"github-followers-281ea.appspot.com",messagingSenderId:"576057379323",appId:"1:576057379323:web:4fb59feea548cdefa1235e"};this.app=i(o);this.auth=u(this.app);this.provider=new d;this.provider.setCustomParameters({allow_signup:"false"});this.token="";this.getView().setModel(new e({token:"",busyOPMLButton:false,typeGitHubButton:"Default",typeSAPButton:"Default",OPMLButtonEnabled:false}),"data")},signInToGitHub:function t(){this.githubSignInPopup(this.provider)},loadGitHubData:async function t(){this.getModel("data").setProperty("/busyGitHubButton",true);this.getModel("data").setProperty("/busyOPMLButton",true);const e=this.getModel("data").getProperty("/gitHubUsername");if(!e||e===""){this.getModel("data").setProperty("/busyGitHubButton",false);this.getModel("data").setProperty("/busyOPMLButton",false);o.error("GitHub Username is empty");return}let s=1;let l=[];let a=[];const r=new n({throttle:{onRateLimit:(t,e)=>{this.octokit.log.warn(`Request quota exhausted for request ${e.method} ${e.url}`);if(e.request.retryCount<=4){console.log(`Retrying after ${t} seconds!`);return true}},onAbuseLimit:(t,e)=>{this.octokit.log.warn(`Abuse detected for request ${e.method} ${e.url}`)}}});let i;try{i=await r.request(`GET /users/${e}/following`)}catch(t){if(t.status===404){this.getModel("data").setProperty("/busyGitHubButton",false);this.getModel("data").setProperty("/busyOPMLButton",false);o.error(`User ${e} not found`)}else{this.getModel("data").setProperty("/busyGitHubButton",false);this.getModel("data").setProperty("/busyOPMLButton",false);o.error(t.message)}}a=i.data;while(i.data.length>=30){s+=1;i=await r.request(`GET /users/${e}/following`,{page:s});a=[...a,...i.data]}this.getModel("data").setProperty("/GitHubFollowing",a);this.getModel("data").setProperty("/typeGitHubButton","Success");this.getModel("data").setProperty("/busyGitHubButton",false);this.getModel("data").setProperty("/busyOPMLButton",false);this.getModel("data").setProperty("/OPMLButtonEnabled",true)},opml:function t(){const e=this.getModel("data").getProperty("/GitHubFollowing")||[];const o=this.getModel("data").getProperty("/SAPFollowing")||[];let s=[];let l=[];var a={title:"title-text",dateCreated:new Date(2014,2,9),ownerName:"azu"};for(var r=0;r<e.length;r++){s.push({text:e[r].login,title:e[r].login,type:"rss",xmlUrl:e[r].html_url+".atom",htmlUrl:e[r].html_url})}for(var r=0;r<o.length;r++){l.push({text:o[r].fullName,title:o[r].fullName,type:"rss",xmlUrl:`https://content.services.sap.com/feed?author=${o[r].userName}`,htmlUrl:o[r].profileUrl})}let n="<head><title>Sample OPML file for RSSReader</title></head>";let i=[];let u=[];for(let t=0;t<s.length;t++){let e='<outline text="'+s[t].text+'" title="'+s[t].title+'" type="'+s[t].type+'" xmlUrl="'+s[t].xmlUrl+'" htmlUrl="'+s[t].htmlUrl+'" />';i.push(e)}for(let t=0;t<l.length;t++){let e='<outline text="'+l[t].text+'" title="'+l[t].title+'" type="'+l[t].type+'" xmlUrl="'+l[t].xmlUrl+'" htmlUrl="'+l[t].htmlUrl+'" />';u.push(e)}let d="";if(u.length>0){d='<outline text="SAP Community Following" title="SAP Community Following">'+u+" </outline>"}if(i.length>0){d=d+'<outline text="GitHub Following" title="GitHub Following">'+i+" </outline>"}let h='<?xml version="1.0" encoding="UTF-8"?><opml version="2.0">'+n+"<body>"+d+"</body>"+"</opml>";this.downloadFile("opml.xml",h)},githubSignInPopup:function t(e){const o=u();h(o,e).then(t=>{this.token=t._tokenResponse.oauthAccessToken;this.getModel("data").setProperty("/token",this.token)}).catch(t=>{var e=t.code;var o=t.message;var s=t.email;var l=t.credential})},downloadFile:function t(e,o){var s=document.createElement("a");s.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(o));s.setAttribute("download",e);s.style.display="none";document.body.appendChild(s);s.click();document.body.removeChild(s)}});return y});