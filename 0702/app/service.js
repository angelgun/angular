angular.module("phone.service",["ngResource"])
       .service("Phone",function($resource){

           return $resource(
               "https://api.mlab.com/api/1/databases/ani2/collections/phonebook/:id",
               {apiKey:"mEnc5U1gz4CKrRrgzKUUkIo2nLSbPNyO",
                   id:"@_id.$oid"},
               {update:{method:"PUT"}});

       });