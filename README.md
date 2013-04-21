## Keen Collector function

This is the module that we use to send events to [Keen.IO](http://www.keen.io)

This module exports a function which takes a configuration object.

Given a valid configuration, it will return a function that you can send arbitrary JavaSript objects to

Those objects will be sent off to Keen.IO

### Example usage:

```
// Load up the module

var KeenCollector = require('keen-collector')

// Create your configuration object

var myConfig = {
    projectToken: "YOUR PROJECT TOKEN HERE"
    , eventCollection: "YOUR EVENT COLLECTION HERE"
}

// Create a collector

var myCollector = KeenCollector(myConfig)

// Send it something

myCollector({ message: "Hello, world!" })

// That object should now beein in your Keen.IO collection!
```

### Configuration

`projectToken` is required and must be a string

`eventCollection` is required and must be a string

`endpoint` is optional and defaults to `https://api.keen.io/3.0/projects/`

`requestLog` if `true` will log information about HTTP requests that are sent to Keen

`responseLog` if `true` will log information about HTTP responses from Keen