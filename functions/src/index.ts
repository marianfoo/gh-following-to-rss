/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import * as functions from "firebase-functions";
import * as cors from "cors";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
const corsHandler = cors({origin: true});


export const helloWorld= functions.https.onRequest(async (request, response) => {
  corsHandler(request, response, async () => {
    functions.logger.info("Hello logs!", {structuredData: true});
    const following = await crawl(request.body.data.userName);
    response.send({
      "status": "success",
      "data": JSON.stringify(following),
    });
  });
});

async function crawl(username:string):Promise<any> {
  const url = `https://people.sap.com/${username}#connections:following`;
  const response = await fetch(url);
  const cookie:string = response.headers.get("set-cookie")!;


  const html = await response.text();
  const $ = cheerio.load(html);
  const csrfToken:string = $("meta[name=csrf-token]").attr("content")!;
  console.log(csrfToken);
  const headers:Record<string, string> = {
    "content-type": "application/json; charset=UTF-8",
    "cookie": cookie,
    "x-csrf-token": csrfToken,
  };
  const page = 1;
  const firstPage = await getFollowings(page, headers);
  const pages = Math.ceil( firstPage["following_count"] / 20);
  for (let i = 2; i <= pages; i++) {
    console.log(i);
    const nextPage = await getFollowings(i, headers);
    firstPage["list_items"] = firstPage["list_items"].concat(nextPage["list_items"]);
  }

  return firstPage;
}

async function getFollowings(page:number, headers:Record<string, string>): Promise<any> {
  const body = JSON.stringify({
    "userName": "mariannnn", "listType": "following", "page": page, "sort": "date_added", "direction": "asc", "search": "",
  });

  const url = "https://people.sap.com/api_v2/subscription/load_connections";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body,
    });
    return await res.json();
    // Do something with the response
  } catch (err) {
    console.log(err);
  }
}
