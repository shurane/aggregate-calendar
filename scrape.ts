import NodeFetchCache, { FileSystemCache } from "npm:node-fetch-cache";
import { xApiKey } from "./config.ts";

// import * as cheerio from 'npm:cheerio';
// import { highlight } from 'npm:cli-highlight';

// const request = await fetch("https://example.com/");
// const page = cheerio.load(await request.text());
// console.log(highlight(page.html(), { language: 'html'}));

const fetch = NodeFetchCache.create({
    cache: new FileSystemCache({ ttl: 1000 * 60 }),
});

const startDT = Temporal.Now.zonedDateTimeISO("UTC").startOfDay()
    .add(Temporal.Duration.from({ hours: 7 }));
const endDT = startDT
    .add(Temporal.Duration.from({ days: 5 }))
    .subtract(Temporal.Duration.from({ minutes: 1 }));
// console.log(startDT.toInstant(), endDT.toInstant());

// info in https://boulderingproject.portal.approach.app/static/js/main.12354cbc.js
// check "widgetsApiKey" and "Approach Portal"
const calendarRequest = await fetch(
    "https://widgets.api.prod.tilefive.com/cal?" +
        new URLSearchParams({
            // startDT: "2024-11-01T07:00:00.000Z",
            // endDT: "2024-11-03T06:59:59.999Z",
            startDT: startDT.toInstant().toString(),
            endDT: endDT.toInstant().toString(),
            locationId: "1",
            activityId: "4,5,6",
            page: "1",
            pageSize: "50",
        }),
    {
        headers: {
            "Accept": "application/json, text/plain, */*",
            "X-Api-Key": xApiKey,
            "Authorization": "boulderingproject",
        },
        method: "GET",
    },
);
const calendarData = await calendarRequest.json();
console.log(calendarData);
