# sLoder - a simple cloud native http-cloud solution

## Getting started
Place the url of the api server in [src/config.js](src/config.js)
and then run `npm start`

## Todo List
- In [src/pages/dashboard/mainareas/addTarget/addTarget.js](src/pages/dashboard/mainareas/addTarget/addTarget.js) adding a target does not update the [targetlist](src/pages/dashboard/dashboard.js)
- There are buttons in the [addTarget](src/pages/dashboard/mainareas/addTarget/addTarget.js) element that should redirect you to a portion of the parent path. They currently dont do that.
- Implement the loading state as well as an error message if the api server is not reachable