import keyObj from "./rapidAPIkey";

export function dateToStr(date) {
    return [date.getFullYear(), date.getMonth(), date.getDate()].join("-");
}

export function getToday() {
    const today = new Date();
    return dateToStr(today);
}

export function getDateBefore(dateStr) {
    let date = new Date(dateStr);
    date.setDate(date.getDate() - 1);
    return date;
}

export function getDateAfter(dateStr) {
    let date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date;
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
        tops: ["Thin@Tanktop/Sleeveless", "Thin@Short-Sleeve Shirt", "Thick@Long-Sleeve Shirt", "Very Thick@Coat", "Thin@Sweater", "Thin@Jacket"],
        bottoms: ["Short@Shorts", "Mini@Skirt", "Thin@Tights", "Thick@Trousers"],
    }
}

export const allTops = [
    {
        type: "Tanktop/Sleeveless",
        variants: [
            {thickness: "Crop Top", warmth: 1},
            {thickness: "Thin", warmth: 2},
            {thickness: "Thick", warmth: 3},
        ]
    },
    {
        type: "Short-Sleeve Shirt",
        variants: [
            {thickness: "Crop Top", warmth: 2},
            {thickness: "Thin", warmth: 3},
            {thickness: "Thick", warmth: 4},
        ]
    },
    {
        type: "Long-Sleeve Shirt",
        variants: [
            {thickness: "Crop Top", warmth: 4},
            {thickness: "Thin", warmth: 5},
            {thickness: "Thick", warmth: 6},
        ]
    },
    {
        type: "Sweater",
        variants: [
            {thickness: "Thin", warmth: 6},
            {thickness: "Thick", warmth: 7},
            {thickness: "Very Thick", warmth: 8},
        ]
    },
    {
        type: "Jacket",
        variants: [
            {thickness: "Very Thin", warmth: 5},
            {thickness: "Thin", warmth: 7},
            {thickness: "Thick", warmth: 8},
        ]
    },
    {
        type: "Coat",
        variants: [
            {thickness: "Thin", warmth: 8},
            {thickness: "Thick", warmth: 9},
            {thickness: "Very Thick", warmth: 10},
        ]
    },
];

export const allBottoms = [
    {
        type: "Shorts",
        variants: [
            {thickness: "Short", warmth: 2},
            {thickness: "Middle-Thigh", warmth: 3},
            {thickness: "Knee", warmth: 4},
            {thickness: "Capri", warmth: 5},
        ]
    },
    {
        type: "Trousers",
        variants: [
            {thickness: "Thin", warmth: 5},
            {thickness: "Thick", warmth: 6},
            {thickness: "Very Thick", warmth: 7},
        ]
    },
    {
        type: "Skirt",
        variants: [
            {thickness: "Mini", warmth: 1},
            {thickness: "Knee", warmth: 2},
            {thickness: "Long", warmth: 4},
        ]
    },
    {
        type: "Tights",
        variants: [
            {thickness: "Thin", warmth: 2},
            {thickness: "Thick", warmth: 3},
            {thickness: "Leggings", warmth: 4},
        ]
    },
];
