document.getElementById("astroSubmit").addEventListener("click", function(event) {
  event.preventDefault();

  const count = document.getElementById("countInput").value;

  if (count === "") {
    let temp = "<br><h1 style='text-align:center;'>Please enter a number</h1>"
    document.getElementById("results").innerHTML = temp;
    return;
  }

  // let temp = "<br><h1>Please wait, currently taking pictures of the galaxy...</h1>"
  // document.getElementById("results").innerHTML = temp;

  const url = "https://api.nasa.gov/planetary/apod?count=" + count + "&api_key=CjRCnyhNJkwu1K3KcpmRTbhI1WR561yo2pfVgvpB"

  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json)

      let results = "<br><div class=astro>"
      for (let i = 0; i < json.length; i++) {
        results += "<div class=astro-item>"
        results += "<img src='" + json[i].url + "' alt='astronomy photo-" + (i + 1) + "'>"
        results += "<br><h2 style='text-align:center;'>Title:</h2><h4 style='text-align:center;color:#e700d5;'>" + json[i].title + "</h4>"
        results += "<h2 style='text-align:center;'>Author:</h2><h4 style='text-align:center;color:#d32c3a;'>" + json[i].copyright + "</h4>"
        results += "<br><h6 style='text-align:center;'>Date the picture was the 'ASPOD': " + json[i].date + "</h6>"
        results += "<h3 style='text-align:center;'>Explanation:</h3>"
        results += "<p class=explanation>" + json[i].explanation + "</p>"
        results += "</div>"
      }

      results += "</div>"
      document.getElementById("results").innerHTML = results;
    })
    .catch((error) => {

    })
})
