angular.module("todo.service",["ngResource"])
  .service("Todo",function($resource){
    //resource
    return $resource("https://api.mlab.com/api/1/databases/ani2/collections/todos/:id",
      {"id":"@_id.$oid",
      "apiKey":"mEnc5U1gz4CKrRrgzKUUkIo2nLSbPNyO"},
      {
        "update":{"method":"PUT"}
      });

  });
