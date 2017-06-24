angular.module('app.services', [])

.service('Survey', ['$http', function($http){

    var api_url = 'https://sheetsu.com/apis/v1.0/7bb559569521';
    var currentID = 1;

    function filterBlankRows(l){
        return l.filter(function(obj){
            return obj.id != '';
        });
    }
    
    var ret = {
        all: function(){
            
            return $http.get(api_url).then(function(resp){
                var results = filterBlankRows(resp.data);
                if (results.length > 0) currentID = parseInt(results[results.length-1].id);
                return results;
            });
            
        }, 
        add: function(data){
            currentID++;
            data.id = currentID;
            
            return $http.post(api_url, data).then(function(resp){
                return resp.data;
            });

        },
        delete: function(id){
            return $http.delete(api_url+'/id/'+id);
        },
        query: function(params){
            
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '?'+actual_params.join('&');
            
            return $http.get(api_url+'/search'+actual_params).then(function(resp){
                return filterBlankRows(resp.data);
            })
            
        }
    }
    
    ret.all();
    
    return ret;

}])

.factory('Uploadcsv', ['$http', function($http){
  var Url   = "src/utils/austin.csv";
  var Uploadcsv = $http.get(Url).then(function(response){
         //return CSVtoArray(response.data);
     return response.data;
  });
  return Uploadcsv;
      
}])

.service('CsvParser', ['$http', function($http){

    // This will parse a delimited string into an array of
    // arrays. The default delimiter is the comma, but this
    // can be overriden in the second argument.
    function CSVToArray( strData, strDelimiter ){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");
        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );
        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];
        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;
        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){
            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];
            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                (strMatchedDelimiter != strDelimiter)
                ){
                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );
            }
            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){
                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                var strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                    );
            } else {
                // We found a non-quoted value.
                var strMatchedValue = arrMatches[ 3 ];
            }
            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }
        // Return the parsed data.
        return( arrData );
    }

}])

.filter('csvToObj', function() {

  return function(input) {
    var rows = input.split('\n');
    var obj = [];
    angular.forEach(rows, function(val) {
      var o = val.split(',');
      obj.push({
        Col1: o[0],
        Col2: o[1],
        Col3: o[2],
        Col4: o[3],
        //CordY: "not sent"
      });
      let localDB = pouchDB('barrenos');
      localDB.put(obj).then(function (response) {
  // handle response
    }).catch(function (err) {
  console.log(err);
});
    });
    return obj;
  };
})

.service('pouchdbserv', ['pouchDB', function(pouchDB) {
  var db = pouchDB('name');
    var PouchDB = require('pouchdb');
    PouchDB.plugin(require('pouchdb-load'));
}]);



        