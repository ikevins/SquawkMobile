import axios from "axios";

export default axios.create({
    baseURL: "https://api.yelp.com/v3/businesses",
    headers: {
        Authorization: `Bearer ygXg7nrp2TH3X_CpYBzRw-x0QN1-D5owhXyg2h6kI80cxwG-gDh3SNjpxU3X4T55tj-7PyQL7WZ8U2_rT0hxrkRU5nBXZnZGBjFNAOyWWEJ8aPhP4W3J4FPXrZVQY3Yx`,
    }
});