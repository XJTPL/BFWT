const tbstyle = document.createElement("link");
tbstyle.rel = "stylesheet";
tbstyle.type = "text/css";
tbstyle.href = "/BFWT/base-style.css";
document.head.appendChild(tbstyle);


var subtitleTag = null;
var linksPlatter = null;

function initBFWT(subtitle, ...links) {
    fetch('/BFWT/titlebar.htmlfrag')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(titleBarHTML => {
            document.body.insertAdjacentHTML('afterbegin', titleBarHTML);
        })
        .catch(error => {
            console.error('Error loading the HTML file:', error);
            die();
        });

    waitForDOMUpdate();
    subtitleTag = document.getElementById("subtitle");
    subtitleTag.textContent = subtitle;

    linksPlatter = document.getElementById("LP");
    for (const [name, href, title] of links) {
        const bullet = document.createTextNode(" \u2022\u00A0");
        const anchorDiv = document.createElement("div");
        const anchor = document.createElement("a");
        anchor.textContent = name;
        anchor.href = href;
        anchor.title = title;
        anchorDiv.append(anchor);

        linksPlatter.append(bullet, anchorDiv);
    }
}


function die() {
    document.documentElement.innerHTML = "512 Unexpected Failure";
    throw null;
}


function waitForDOMUpdate() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}

