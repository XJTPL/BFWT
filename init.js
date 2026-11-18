// Constants

const homepage_links = [
    ["Google Drive Comic Archive", "/BFWT/?gdca-redirect=all", "Hey it rhymes!"],
    ["Read now!", "/BFWT/read", "idk what this is supposed to do anymore lol"],
    ["More links...", "/BFWT/more", "See more!"]
];


// Load style CSS

const tbstyle = document.createElement("link");
tbstyle.rel = "stylesheet";
tbstyle.type = "text/css";
tbstyle.href = "/BFWT/fragments/base-style.css";
document.head.append(tbstyle);


// GDCA Redirect Service

const uparams = new URLSearchParams(window.location.search);
if (uparams.has("gdca-redirect")) {
    fetch('./gdca-redirect-links.json').then(response => {
        if (!response.ok) {
            throw new Error('Bad Response');
        }
        return response.json();
    }).then(links => {
        var stuff = uparams.get("gdca-redirect").match(/s?(\d*)e?([\w-]*)/i);
        const season = stuff[1].trim() || "all";
        const episode = stuff[2].trim() || "all";
        link = links[season]?.[episode];
        if (link == null) {
          document.getElementById("GDCA redirect error message").style.display = "block";
        } else {
          redirect(link);
        }
    }).catch(error => {
        console.error(error);
        die();
    });
}


// Actual stuff

function initBFWT(subtitle, links) {
    var barsHTML = localStorage.getItem('barsHTML');
    if (barsHTML != null) {
        insert();
    }

    fetch('/BFWT/fragments/bars.html')
        .then(response => response.text())
        .then(new_barsHTML => {
            if (barsHTML != new_barsHTML) {
                console.log(`Replacing\n${barsHTML}\nwith\n${new_barsHTML}`);
                localStorage.setItem('barsHTML', new_barsHTML);
                insert();
            }
            waitForDOMUpdate().then(() => {
                document.documentElement.style.visibility = 'visible';
            });
        })
        .catch(error => {
            console.error(error);
            die();
        });
    
    function insert() {
        try {
            insert_try();
        } catch (error) {
            console.error(error);
        }
    }

    function insert_try() {
        barsHTML = localStorage.getItem('barsHTML');
        const parser = new DOMParser();
        const bars = parser.parseFromString(barsHTML, "text/html");
        const tbid = "The BFWT Title Bar";
        document.getElementById(tbid)?.remove();
        document.body.prepend(bars.getElementById(tbid));
        const bbid = "The Bottom Bar";
        document.getElementById(bbid)?.remove();
        document.body.append(bars.getElementById(bbid));

        const subtitleTag = document.getElementById("subtitle");
        subtitleTag.textContent = subtitle;

        linksPlatter = document.getElementById("LP");
        for (const [name, href, title] of links) {
            const linkDiv = document.createElement("div");
            linkDiv.className = "linkDiv";
            const bullet = document.createTextNode("\u2022");
            const anchorDiv = document.createElement("div");
            anchorDiv.className = "anchorDiv";
            const anchor = document.createElement("a");
            anchor.textContent = name;
            anchor.href = href;
            anchor.title = title;
            anchorDiv.append(anchor);
            linkDiv.append(bullet, anchorDiv);
            linksPlatter.append(linkDiv);
        }
    }
}

function waitForDOMUpdate() {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            setTimeout(resolve, 0);}
        );
    });
}


// Closing functions

function die() {
    document.documentElement.innerHTML = "512 Unexpected Failure or Bad Response";
    throw null;
}

function gotoghs() {
    window.location.href = window.location.href.replace("xjtpl.github.io/BFWT", "github.com/XJTPL/BFWT/tree/main");
}

function redirect(link) {
    window.location.replace(link);
}

