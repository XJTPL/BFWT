const tbstyle = document.createElement("link");
tbstyle.rel = "stylesheet";
tbstyle.type = "text/css";
tbstyle.href = "/BFWT/fragments/base-style.css";
document.head.append(tbstyle);

const uparams = new URLSearchParams(window.location.search);


function initBFWT(subtitle, links) {
    var barsHTML = localStorage.getItem('barsHTML');
    if (barsHTML != null) {
        insert();
    }

    fetch('/BFWT/fragments/bars.htmlfrag')
        .then(response => response.text())
        .then(new_barsHTML => {
            if (barsHTML != new_barsHTML) {
                console.log(`Replacing\n${barsHTML}\nwith\n${new_barsHTML}`);
                localStorage.setItem('barsHTML', new_barsHTML);
                insert();
            }
            document.documentElement.style.visibility = 'visible';
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


function die() {
    console.log(localStorage.getItem('barsHTML'));
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

function gotoghs() {
    window.location.href = window.location.href.replace("xjtpl.github.io/BFWT", "github.com/XJTPL/BFWT/tree/main");
}

function redirect(link) {
    window.location.replace(link);
}

