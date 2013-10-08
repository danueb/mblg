window.movieInfoTemplate = [
  "<div class='container'>",
    "<header>",
      "{{#if facts.poster_path}}",
        "<img width='212' src={{posterUrl facts.poster_path}} />",
      "{{/if}}",
      "<h1>{{title}} <span>({{year}})</span></h1>",
    "</header>",
    "{{#if facts}}",
      "<ul>",
          "<li><span>Director: </span>{{director facts.casts.crew}}</li>",
          "<li><span>{{writerLabel facts.casts.crew}}: </span>{{writers facts.casts.crew}}</li>",
          "<li><span>Starring: </span>{{stars facts.casts.cast}}</li>",
          "<li><span>Released: </span>{{facts.release_date}}</li>",
          "<li><span>Synopsis: </span>{{facts.overview}}</li>",
        "</ul>",
    "{{else}}",
      "<p>Loading data from The Movie Database...</p>",
      "<p>If this is on screen long enough so that you can read it, something probably went wrong while fetching the data. Or tMDb is having issues. Yeah, let&#39;s push the blame their way.</p>",
    "{{/if}}",
  "</div>"
].join("\n");