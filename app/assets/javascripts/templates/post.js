window.postTemplate = [
  "<div class='container'>",
    "<header>",
      "<h1><span>I Watched: </span>{{movieTitle}}</h1>",
      "<time>{{date}}</time>",
    "</header>",
    "{{{content}}}",
    "<footer>",
      "<div class='prev'>Previous</div>",
      "<div class='next'>Next</div>",
    "</footer>",
  "</div>"
].join("\n");