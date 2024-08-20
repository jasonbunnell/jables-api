# Jables API
## Packages
* **Colors** - adds color options to console
* **Morgan** - middleware package used to log API calls
* **Mongoose** - mongodb object modeling for node.js
* **[Node Geocode](https://github.com/nchaulet/node-geocoder)** - Node.js geocode library

## Services
* **[MapQuest Developer](https://developer.mapquest.com/)** - Used to get geocode data, uses CapOne cc
* **[MongDB](https://cloud.mongodb.com)** - uses Project Name - Jables.  Database - jables-api.  Username flxcompass@gmail.com.

## Routes
* **GET All Attractions** - gets all attractions
* **GET Single Attraction** - gets single attractions.  EXAMPLE `attractions/6547fb4360d6559437942a1a`
* **GET Attraction by Distance** - gets attractions within radius of zip code.  EXAMPLE `attractions/radius/14456/5` where the after radius you provide a zipcode and after zip you provide the radius in miles.

## Filtering
* **Single Filter** - You can filter by using ?.  EXAMPLE - `attractions?city=Geneva`
* **Filter in Array** - You can filter in an array using in opperator.  EXAMPLE - `attractions?category[in]=winery`
* **Logical Expression** - You can filter using a logical expression.  EXAMPLE - `attractions?likes[gte]=1`
* **Combining Filters** - You can combine filters using the &.  EXAMPLE - `attractions?category[in]=winery&lake=Geneva`

## Select
You can use a select so that the results return only selected fields instead of all fields. EXAMPLE `attractions?select=aName,category`

## Sort
You can sort.  EXAMPLE `attractions?sort=-likes`
* **Ascending** - this is the default.
* **Descending** - put a negative or "-" before the field to sort
* **Default** - default sort is by aName.  This can be changed in the controller method in the else for the sort function.

## Pagination, Limit
* **Pagination** - this is an object that has a next and prev value if there is a next or previous page.  These objects show the next and prev page values and the limit per page.
* **Limit** - this is a value set by the limit variable or by the limit parameter.  EXAMPLE - `attractions?limit=10`
* **Page** - this is a value set by the page variable that default to 1 or by the page parameter.  EXAMPLE - `attractions?page=2`

## Config
* **Config** - backup config folder on Google Drive personal under FLX compass.

# Outstanding Backend Tasks
These are tasks that have not been completed yet.
* [ ] Using `Event.findByIdAndDelete(req.params.id)` instead of `event.remove()` because the remove function is depricated.  This will conflict with course middleware as it had created a function that if an attraction was deleted that had events, it would delete events too.
* [ ] User `bookmarks` `Events` and `likes` `Entertainers`.  Remove `likes` field from `Attraction` collection.  `Attraction` will have `avgBookmarks` which is the average from the number of bookmarks for each event at that attraction.
* [ ] avgBookmarks did not calculate for Del Lago attraction with id of 66c3c0a78085d1ef5b9f9d63.


