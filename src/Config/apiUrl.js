export const authApi = 'http://192.168.50.79:9200';

export const backendAPI = 'http://192.168.50.79:9090';

export const googleApi = 'https://maps.googleapis.com/maps';


function xmlToJson( xml ) {
var obj = {};
 
  if ( xml.nodeType == 1 ) { // element
    // do attributes
    if ( xml.attributes.length > 0 ) {
    obj["@attributes"] = {};
      for ( var j = 0; j < xml.attributes.length; j++ ) {
        var attribute = xml.attributes.item( j );
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if ( xml.nodeType == 3 ) { // text
    obj = xml.nodeValue;
  }
 
  // do children
  if ( xml.hasChildNodes() ) {
    for( var i = 0; i < xml.childNodes.length; i++ ) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if ( typeof(obj[nodeName] ) == "undefined" ) {
        obj[nodeName] = xmlToJson( item );
      } else {
        if ( typeof( obj[nodeName].push ) == "undefined" ) {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push( old );
        }
        obj[nodeName].push( xmlToJson( item ) );
      }
    }
  }
  return obj;
};

export function cadena (){
	var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       //console.log(this.responseXML.getElementsByTagName("google")[0]);
	   var str = this.responseXML
		var jsonr = xmlToJson(str)
		//console.log(jsonr.normalizador_config.api_keys.google['#text'])
		var key = jsonr.normalizador_config.api_keys.google['#text']
		//console.log("222222222222222222222222222222222")
		//console.log(key)
		window.$key = key;
		
    }
};
xhttp.open("GET","http://192.168.50.91:9090/xmlapi",true);
xhttp.send();
//console.log("---------------------------")
//console.log(window.$key)
return window.$key
}

export const apikey = cadena()

//export const googleMapsApiKey = cadena();