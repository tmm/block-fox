// CONSTANTS
const blockedSitesListId = '#blocked-sites';
const enabledSwitchId = '#enabled-switch';
const nuclearSwitchId = '#nuclear-switch';
const addContainerClass = '.options__sites-add'
// CONSTANTS

// INIT
chrome.tabs.getSelected(null, (tab) => {
    if (`chrome-extension://${chrome.runtime.id}/src/options/index.html` === tab.url) {
        console.log('options page');
    }
});

let sites = JSON.parse(localStorage.getItem(blockedSitesKey)) || [];
const blockedSitesListElement = document.querySelector(blockedSitesListId);
sites.forEach((site, index) => {
    const prettyUrl = getPrettyUrl(site);
    const markup = `
        <div id="site-${index}" class="options__site">
            <button id="delete-${index}" class="options__site-delete" data-site="${site}"></button>
            <a href="${site}">${prettyUrl}</a>
        </div>
    `;
    blockedSitesListElement.insertAdjacentHTML('afterend', markup);
    const deleteElement = document.querySelector(`#delete-${index}`);
    deleteElement.addEventListener('click', () => {
        sites = sites.filter(site => site !== deleteElement.dataset.site);
        localStorage.setItem(blockedSitesKey, JSON.stringify(sites));
        const siteElement = document.querySelector(`#site-${index}`);
        siteElement.parentNode.removeChild(siteElement);
    });
});

const enabled = localStorage.getItem(enabledSwitchKey) !== null &&
                localStorage.getItem(enabledSwitchKey) === 'true';
updateSwitchForId(enabledSwitchId, enabled);

const nuclearEnabled = localStorage.getItem(nuclearSwitchKey) !== null &&
    localStorage.getItem(nuclearSwitchKey) === 'true';
updateSwitchForId(nuclearSwitchId, nuclearEnabled);
// INIT

// EVENT LISTENERS
const enabledSwitchElement = document.querySelector(enabledSwitchId);
enabledSwitchElement.addEventListener('change', () =>
    localStorage.setItem(enabledSwitchKey, enabledSwitchElement.checked));

const nuclearSwitchElement = document.querySelector(nuclearSwitchId);
nuclearSwitchElement.addEventListener('change', () =>
    localStorage.setItem(nuclearSwitchKey, nuclearSwitchElement.checked));

const addContainerElement = document.querySelector(addContainerClass);
const addInputElement = addContainerElement.getElementsByTagName('input')[0];
const addButtonElement = addContainerElement.getElementsByTagName('button')[0];
addButtonElement.addEventListener('click', () => {
    if (addInputElement.value && addInputElement.value.length) {
        console.log('addButtonElement', addInputElement.value);
    }
});
// EVENT LISTENERS
