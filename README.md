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

