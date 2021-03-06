// CONSTANTS
const siteDescriptionId = '#description';
// CONSTANTS

// INIT
const visitedCounts = JSON.parse(localStorage.getItem(visitedCountsKey)) || {};
const siteDescriptionElement = document.querySelector(siteDescriptionId);
const blockedSite = localStorage.getItem(blockedSiteKey);
const blockedSiteRaw = localStorage.getItem(blockedSiteRawKey);
let innerHTML;
if (blockedSiteRaw !== 'null' && blockedSite !== 'null') {
    const prettyUrl = getPrettyUrl(blockedSite);
    innerHTML = `
        <b>nice try!</b>
        <br>
        <a href="${blockedSiteRaw}">${prettyUrl}</a> is blocked.
    `;
} else {
    const nuclearTime = new Date(localStorage.getItem(nuclearTimeKey));
    const minutes = nuclearTime.getMinutes() > 9 ?
        nuclearTime.getMinutes() :
        `0${nuclearTime.getMinutes()}`;
    innerHTML = `
        <b>focus mode enabled</b>
        <br>
        turns off at ${nuclearTime.getHours()}:${minutes}
    `;
}
siteDescriptionElement.innerHTML = innerHTML;

if (blockedSite in visitedCounts) {
    console.log('before', visitedCounts[blockedSite]);
    visitedCounts[blockedSite] = visitedCounts[blockedSite] + 1;
    console.log('after', visitedCounts[blockedSite]);
} else {
    visitedCounts[blockedSite] = 1;
}
localStorage.setItem(visitedCountsKey, JSON.stringify(visitedCounts));
// INIT
