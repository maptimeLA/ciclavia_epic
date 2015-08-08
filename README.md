Militant's Epic Ciclavia Tour 4.1 Map
=====================================

LA's "well known" native, the [Militant Angeleno has laid out an awesome tour for everyone going to CicLAvia.](http://militantangeleno.blogspot.com/2015/08/the-militants-epic-militant-ciclavia.html)

This map will enable his tour to be accessible to everyone during the event in a mobile format that can even locate where you are on the route!

Link of map so far: [Map](http://maptimela.github.io/ciclavia_epic/)

So far...
=========
- Locations coverted to geojson
- HTML page with div's containing matching IDs to load descriptions of each location
- Contents of popups moved to div
- Button locating cyclist of their position on the map

What's left to do...
====================
- Clean up UX (Button position)
- Perform scroll animation of information below map on mobile
- Custom Marker Icons for Locations

Directions for running map locally
=========
0. If you're trying to make edits, Make a GitHub account, log in, and make sure you are part of `maptimeLA` group.
1. Open Terminal and clone this repository by running `git clone https://github.com/maptimeLA/ciclavia_epic`. If you're using the `GitHub App`, click the blue Plus sign on the upper left hand corner, go to `Clone` and find `maptimeLA/ciclavia_epic`
2. `cd old-la-restaurants`
3. `python -m SimpleHTTPServer 8000`
4. Go to your browser and open `http://localhost:8000/`
5. To open on your phone, find your IP address and open `http://[YOUR-IP-ADDRESS]:8000/`

# Data source
[The Militant's Epic Militant CicLAvia Tour 4.1!!!!](http://militantangeleno.blogspot.com/2015/08/the-militants-epic-militant-ciclavia.html)
