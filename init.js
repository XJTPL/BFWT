const tbstyle = document.createElement("link");
tbstyle.rel = "stylesheet";
tbstyle.type = "text/css";
tbstyle.href = "/BFWT/base-style.css";
document.head.appendChild(tbstyle);


var subtitleTag = null;
var linksPlatter = null;

function initBFWT(subtitle, ...links) {
    fetch('/BFWT/titlebar.htmlfrag')
        .then(response => response.text())
        .then(titleBarHTML => {
            document.body.insertAdjacentHTML('afterbegin', titleBarHTML);

            subtitleTag = document.getElementById("subtitle");
            subtitleTag.textContent = subtitle;

            linksPlatter = document.getElementById("LP");
            for (const [name, href, title] of links) {
                const linkDiv = document.createElement("div");
                linkDiv.className = "linkDiv";
                const bullet = document.createTextNode(" \u2022 ");
                const anchorDiv = document.createElement("div");
                anchorDiv.className = "anchorDiv";
                const anchor = document.createElement("a");
                anchor.textContent = name;
                anchor.href = href;
                anchor.title = title;
                anchorDiv.append(anchor);
                linkDiv.append(bullet, anchorDiv);
            }
        })
        .catch(error => {
            console.error(error);
            die();
        }); 
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

