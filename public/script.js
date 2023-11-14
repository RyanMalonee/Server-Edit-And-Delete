// Gets the cities from the server
const getCities = async () => {
  try {
    const response = await fetch("api/cities/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Shows the city names in the list of cities box
const showCities = async () => {
  document.getElementById("cities").innerHTML = "";
  let cities = await getCities();
  cities.forEach((city) => {
    const section = document.createElement("section");
    const a = document.createElement("a");
    section.append(a);
    section.classList.add("column");
    a.href = "#";
    a.innerHTML = city.name;
    document.getElementById("cities").append(section);
    a.onclick = (e) => {
      e.preventDefault();
      displayDetails(city);
    };
  });
};

// Displays the City details in the Details box
displayDetails = (city) => {
  document.getElementById("details").innerHTML = "";
  const section = document.createElement("section");
  section.classList.add("column");

  const h2 = document.createElement("h2");
  h2.innerHTML = city.name;
  section.append(h2);

  const p = document.createElement("p");
  p.innerHTML = `Country: ${city.country}`;
  section.append(p);

  const p2 = document.createElement("p");
  p2.innerHTML = `Population: ${city.population}`;
  section.append(p2);

  const language = document.createElement("p");
  language.innerHTML = `Prominent Language: ${city.prominentLanguage}`;
  section.append(language);

  const landmarks = document.createElement("p");
  landmarks.innerHTML = "Landmarks: ";

  city.landmarks.forEach((landmark) => {
    if (landmark == city.landmarks[city.landmarks.length - 1]) {
      landmarks.innerHTML += `${landmark}`;
    } else {
      landmarks.innerHTML += `${landmark}, `;
    }
  });

  section.append(landmarks);

  const funFact = document.createElement("p");
  funFact.innerHTML = `Fun Fact: ${city.funFact}`;
  section.append(funFact);

  document.getElementById("details").append(section);
};

// Adds a city to the server via the form
const addCity = async (e) => {
  e.preventDefault();
  let response;

  const form = document.getElementById("add-city-form");
  const result = document.getElementById("result");
  const formData = new FormData(form);
  formData.append("name", document.getElementById("cityName").value);
  formData.append("country", document.getElementById("country").value);
  formData.append("population", document.getElementById("population").value);
  formData.append(
    "prominentLanguage",
    document.getElementById("prominentLanguage").value
  );
  formData.append("landmarks", document.getElementById("landmarks").value);
  formData.append("funFact", document.getElementById("funFact").value);
  console.log(...formData);
  response = await fetch("/api/cities", {
    method: "POST",
    body: formData,
  });

  if (response.status == 400) {
    result.innerHTML = "Error: your city was not added";
    result.style.color = "red";
    setTimeout(() => {
      result.innerHTML = "";
    }, 3000);
  } else {
    // Waits until the city has been added to the server before it is shown
    response = await response.json();
    showCities();
    result.innerHTML = "City added successfully";
    result.style.color = "green";
    setTimeout(() => {
      result.innerHTML = "";
    }, 3000);
  }
  document.getElementById("add-city-form").reset();
};

// shows and hides the form
const showForm = () => {
  document.getElementById("add-city-form").classList.remove("fade-out");
  document.getElementById("add-city-form").classList.remove("hide");
  document.getElementById("add-city-form").classList.add("fade-in");
};

const hideForm = () => {
  document.getElementById("add-city-form").classList.remove("fade-in");
  document.getElementById("add-city-form").classList.add("fade-out");
  setTimeout(() => {
    document.getElementById("add-city-form").classList.add("hide");
  }, 500);
};

window.onload = () => {
  showCities();
  document.getElementById("addCity").onclick = showForm;
  document.getElementById("add-city-form").onsubmit = addCity;
  document.getElementById("exit-button").onclick = hideForm;
};
