document.getElementById("marsSubmit").addEventListener("click", function(event) {
  event.preventDefault();

  let s = document.getElementById('selector');
  let camera = s.options[s.selectedIndex].value;
  let sol = "100"
  if (camera === "MAHLI") {
    sol = "150"
  }

  const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + sol + "&camera=" + camera + "&api_key=CjRCnyhNJkwu1K3KcpmRTbhI1WR561yo2pfVgvpB"
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "<br><h1>Error with getting the data. Please make sure that the date entered was valid and try again.</h1>"
      document.getElementById("results").innerHTML = results;

      results = "<div class=mars-container>"
      let photos = json.photos
      for (let i = 0; i < photos.length; i++) {
        results += "<div class=mars-item>"
        results += "<img src='" + photos[i].img_src + "' alt='Mars photo-" + i + "'>"
        results += "<h5 style='text-align:center;width:95%;'>Rover name: " + photos[i].rover.name + "</h5>"
        results += "<h5 style='text-align:center;width:95%;'>Rover's landing on Mars date: " + photos[i].rover.landing_date + "</h5>"

        if (photos[i].rover.status === "active") {
          results += "<h5 style='text-align:center;width:95%;'>Rover is still active</h5>"
        } else {
          results += "<h5 style='text-align:center;width:95;'>Rover is no longer active</h5>"
        }
        results += "</div>"
      }

      results += "</div>"
      document.getElementById("results").innerHTML = results;
    })
    .catch((error) => {

    })
})
