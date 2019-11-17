# Wearther
![wearther logo](public/logo192.png)

## Inspiration

Living in the UK, we wanted to have an easy automated way to choose what clothes to wear to be able to stay warm  (but not too hot!), and not catch any freshers' flu. Wearther can be used in any place in the world by anyone to find which suitable clothes they can wear to feel comfortable during the day!

## What Wearther does

Wearther keeps the user's history of what clothes they wore at what temperature, and how they felt on those days. Using this information, and the weather data at the user's location, it suggests an outfit which will keep the user happy and comfortable for the whole day (no shivering nor sweating!).

## How we built it

We used React App to make a front page, and an edit page. In the front page, it has the day's weather at the user's location, the outfit suggestion, and a way to add "how you felt" in the previous day (i.e. too cold, comfortable, or too hot). The weather is found using rapid API. The suggestion algorithm uses the history of the user's outfits during different days/temperatures.

The edit page allows the user to edit the clothing items (add and delete types).

## Challenges we ran into

Without having a database of how a user felt at different temperatures wearing particular outfits, we were unable to find a model which "fits the data" during the time of OxfordHack. For the future, as we collect more data points, we would like to investigate what model best fits the data points (of the quantitative warmth of total clothes layers against temperature).

## What's next for Wearther

To develop Wearther further, we would also like to be able to customise the clothes to match the user's wardrobe (i.e. include specific clothes that the user owns).

## Accomplishments that we're proud of

We managed to debug our code!

## What we learned

How to work together simultaneously on a project without having any clashes!

How to use rapid API to get local weather!

How to organise our files comprehensively, and use them effectively in React!
