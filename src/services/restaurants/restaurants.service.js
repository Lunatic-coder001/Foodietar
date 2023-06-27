
import { mockImages, mocks } from "./mock";
import camelize from "camelize";
export const restaurantsRequest = (location ) => {
    return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
        reject("not found");
    }
    resolve(mock);
});
};

export const restaurantsTransform = ({ results = [] }) => { 
    const mappedResults = results.map((restaurant) => {
        restaurant.photos = restaurant.photos.map((restaurant) => {
            return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
        });
        return {
            ...restaurant,
            address:restaurant.vicinity,
            isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
            isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
        };
    });
    return camelize(mappedResults);
};
restaurantsRequest()
    .then(restaurantsTransform)
    .then((transformedResponse) => {
        console.log(transformedResponse);
    })
    .catch((err) => {
        console.log("error");
    });

restaurantsRequest().then((result) => {
    console.log(result);
}).catch((err) => {
    console.log("error")
})
// This is a way of basically saying a restaurant request is not going to return immediately.
// It's going to return sometime in the future
// So we're doing that then.
// And that then returns us the result.
// As an inner function, so by doing this, syntax will be resolving the inner function and will have
// the result, and if we  do a console.log result, we'll retrieve the result now.
