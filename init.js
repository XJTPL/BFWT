const tbstyle = document.createElement("link");
tbstyle.rel = "stylesheet";
tbstyle.type = "text/css";
tbstyle.href = "/BFWT/base-style.css";
document.head.appendChild(tbstyle);

function initBFWT(subtitle, ...links) {
    fetch('/BFWT/titlebar.htmlfrag')
        .then(response => {
            if (!response.ok) {
                die();
            }
            return response.text();
        })
        .then(titleBarHTML => {
            document.getElementById(elementId).innerHTML = titleBarHTML;
        })
        .catch(error => {
            die();
        });

    const subtitleTag = document.getElementById("subtitle");
    subtitleTag.textContent = subtitle;

    const linksPlatter = document.getElementById("LP");
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
}

