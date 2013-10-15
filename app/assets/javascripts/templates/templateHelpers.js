Handlebars.registerHelper('posterUrl', function(path){
  return "http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w342" + path;
});

Handlebars.registerHelper('director', function(crew){
  return _.findWhere(crew, {job: "Director"}).name;
});

Handlebars.registerHelper('writerLabel', function(crew){
  var writers = _.where(crew, {department: "Writing"});
  if(writers.length > 1){
    return "Writers";
  }
  return "Writer";
});

Handlebars.registerHelper('writers', function(crew){
  var writers, out = "", limit = 2, i = 0;
  writers = _.where(crew, {department: "Writing"});

  if (limit > writers.length) { limit = writers.length; }
  for(i = 0; i < limit; i++){
    if(i != 0) { out += ", "; }
    out += writers[i].name;
  }
  if (writers.length > limit) { out += ", others"; }
  return out;
});

Handlebars.registerHelper('stars', function(cast){
  var out = "", limit = 4, i = 0;
  if (limit > cast.length) { limit = cast.length; }
  for(i = 0; i < limit; i++){
    if(i != 0) { out += ", "; }
    out += cast[i].name;
  }
  return out;
});