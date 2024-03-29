function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getBalValue() {
  var uiBalcony = document.getElementsByName("uibal");
  for(var i in uiBalcony) {
    if(uiBalcony[i].checked) {
        return parseInt(i);
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bh = getBHKValue();
  var bathrooms = getBathValue();
  var balcony = getBalValue();
  var location = document.getElementById("uiLocations");
  var society = document.getElementById("uiSoc");
  var estPrice = document.getElementById("uiEstimatedPrice");

  console.log(sqft.value);
  console.log(bh);
  console.log(location.value);
  console.log(bathrooms);
  console.log(society.value);
  console.log(balcony);


  var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
  //var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

  $.post(url, {
      locations: location.value,
      bhk: bh,
      society_mod: society.value,
      total_sq: parseFloat(sqft.value),
      bath: bathrooms,
      balcony_mo: balcony

  },function(data, status) {
      console.log(data.predicted_price);
      estPrice.innerHTML = "<h2>" + data.predicted_price.toString() + " Lakh</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  var url = "http://127.0.0.1:5000/get_location"; // Use this if you are NOT using nginx which is first 7 tutorials
  //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;