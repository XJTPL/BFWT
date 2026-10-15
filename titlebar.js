const tbstyle = document.createElement("link");
tbstyle.rel = "stylesheet";
tbstyle.type = "text/css";
tbstyle.href = "/BFWT/base-style.css";
document.head.appendChild(tbstyle);

function initBFWT(subtitle, ...links) {
    const titleBar = document.createElement("div");
    titleBar.className = "titleBar";
    document.body.prepend(titleBar);
    

    const titlePlate = document.createElement("div");
    titlePlate.className = "titlePlate";
    titleBar.append(titlePlate);


    const titleBFWT = document.createElement("div");
    titleBFWT.className = "title";
    titlePlate.append(titleBFWT);


    const BFWTAnchor = document.createElement("a");
    BFWTAnchor.href = "https://xjtpl.github.io/BFWT/";
    
    const B = document.createElement('span');
    B.textContent = 'B';
    B.style.color = 'red';
    const F = document.createElement('span');
    F.textContent = 'F';
    F.style.color = 'yellow';
    const W = document.createElement('span');
    W.textContent = 'W';
    W.style.color = 'lime';
    const T = document.createElement('span');
    T.textContent = 'T';
    T.style.color = 'blue';
    BFWTAnchor.append(B, F, W, T);

    titleBFWT.append(BFWTAnchor);


    const subtitleTag = document.createElement("div");
    subtitleTag.textContent = subtitle;
    subtitleTag.className = "subtitle";
    titlePlate.append(subtitleTag);


    const linksPlatter = document.createElement("div");

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

    titleBar.append(linksPlatter);
}
