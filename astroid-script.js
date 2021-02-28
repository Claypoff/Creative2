document.getElementById("astroidSubmit").addEventListener("click", function(event) {
  event.preventDefault();

  const year = document.getElementById("yearInput").value;
  const month = document.getElementById("monthInput").value;
  const day = document.getElementById("dayInput").value;
  const date = day + "-" + month + "-" + year;

  if (year === "" || month === "" || day === "") {
    let temp = "<br><h1>Please enter a date for the year, month, and day!</h1>"
    document.getElementById("results").innerHTML = temp;
    return;
  }

  let temp = "<br><h1 style='text-align:center;'>Please wait, currently finding the astroids in space... (might take a couple of seconds)</h1>"
  document.getElementById("results").innerHTML = temp;

  const url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + year + "-" + month + "-" + day + "&api_key=CjRCnyhNJkwu1K3KcpmRTbhI1WR561yo2pfVgvpB"

  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let astroids = json.near_earth_objects[Object.keys(json.near_earth_objects)[0]];
      let results = "<hr><br><div class=astroid>"
      results += "<h2 style='text-align:center;color:#eeeeee;'>" + astroids.length + " astroids found for the date: "  + date + "</h2>"

      results += "<br><div class=astroid-container>"
      for (let i = 0; i < astroids.length; i++) {
        results += "<div class=astroid-item>"
        results += "<h2 style='text-align:center;color:#e700d5;'>Astroid: " + astroids[i].name + "</h2>"
        results += "<h3 style='text-align:center;'>The estimated min diameter is: " + astroids[i].estimated_diameter.feet.estimated_diameter_min + " ft<h3>"
        results += "<h3 style='text-align:center;'>The estimated max diameter is: " + astroids[i].estimated_diameter.feet.estimated_diameter_max + " ft<h3>"
        results += "<h4 style='text-align:center;'>The absolute magnitude of the astroid is " + astroids[i].absolute_magnitude_h + "</h4>"

        if (astroids[i].is_potentially_hazardous_asteroid) {
          results += "<p class=explanation>The Astroid is potentially hazardous</p>"
        } else {
          results += "<p class=explanation>The Astroid is not hazardous</p>"
        }
        results += "</div>"
      }

      results += "</div></div>"
      document.getElementById("results").innerHTML = results;
    })
    .catch((error) => {
      let results = "<br><h1>Error with getting the data. Please make sure that the date you entered was valid and try again.</h1>"
      document.getElementById("results").innerHTML = results;
    })
})
