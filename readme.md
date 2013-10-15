# mblg #

This is a simple single-page movie blog written in rails and backbone.js (with some fancy responsive styling via bootstrap and LESS).

This is in no way a general-purpose blog; every post is meant to be about a movie in a more-or-less predefined set of movies that I curated for myself. Yeah, seriously. You can find more info about the blog's concept on the blog itself.

See work in progress here:
http://mblg.niconicodouglas.com/

## development ##

Mostly done. There are some tweaks to make here and there (Sometimes the data I get from tmdb isn't formatted very appealingly, there's a lot of copy in templates that should probably live somewhere else), but for the most part the only big step left is to give it a more production-appropriate URL and start populating it with real posts.

Post creating and editing are currently on separate pages from the "main" single-page backbone app that is the rest of the site. Maybe later if I feel like a minor project I'll fold it all in, but in the short term this makes things way simpler (especially concerning authentication). Nobody will ever see the creation/editing pages but me anyway.