fetch("https://opentdb.com/api_category.php")
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.log("Error"))