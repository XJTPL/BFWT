const tbstyle = document.createElement("link");
tbstyle.rel = "stylesheet";
tbstyle.type = "text/css";
tbstyle.href = "/BFWT/base-style.css";
document.head.appendChild(tbstyle);


function initBFWT(subtitle, ...links) {
    var titleBarHTML = localStorage.getItem('titleBarHTML');
    if (titleBarHTML == null) {
        fetch('/BFWT/titlebar.htmlfrag')
        .then(response => response.text())
        .then(new_titleBarHTML => {
            titleBarHTML = new_titleBarHTML;
            insert();
        })
        .catch(error => {
            console.error(error);
            die();
        });
    } else {
        insert();
        fetch('/BFWT/titlebar.htmlfrag')
        .then(response => response.text())
        .then(new_titleBarHTML => {
            if (titleBarHTML != new_titleBarHTML) {
                titleBarHTML = new_titleBarHTML;
                insert();
            }
        })
        .catch(error => {
            console.error(error);
            die();
        });
    }
    
    function insert() {
        document.getElementById("titleBar")?.remove();
        document.body.insertAdjacentHTML('afterbegin', titleBarHTML);

        const subtitleTag = document.getElementById("subtitle");
        const subtitleTag.textContent = subtitle;

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

