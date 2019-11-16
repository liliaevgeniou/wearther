import keyObj from "./rapidAPIkey";

export function getDate() {
  const today = new Date();
  return [today.getFullYear(), today.getMonth(), today.getDate()].join("-");
}

export function getWeather(f) {
  let lon = 51.7520;
  let lat = 1.2577;

  navigator.geolocation.getCurrentPosition(position => {
    lon = position.coords.longitude;
    lat = position.coords.latitude;

    fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/current?lang=en&lon=${lon}&lat=${lat}`,
        {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
            "x-rapidapi-key": keyObj.key,
          },
        })
        .then(response => response.json())
        .then(response => {
          const data = response.data[0];
          f({
            temp: data["temp"],
            icon: data["weather"]["icon"],
          });
        })
        .catch(err => {
          console.log(err);
        });
  })
}

export function getClothes(history) {
  return {
    tops: ["Thin@Tanktop/Sleeveless", "Thick@Short-Sleeve Shirt", "Thin@Jacket", "Very Thick@Coat"],
    bottoms: ["Thick@Trousers"],
  }
}
