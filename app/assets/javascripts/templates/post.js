window.postTemplate = [
  "<div class='container'>",
    "<header>",
      "<h1><span>I Watched: </span>{{movieTitle}}</h1>",
      "<time datetime='{{date}}'>Posted on {{formatted_date}}</time>",
    "</header>",
    "{{{content}}}",
    "<footer>",
      "<div class='prev'>Previous</div>",
      "<div class='next'>Next</div>",
    "</footer>",
  "</div>"
].join("\n");