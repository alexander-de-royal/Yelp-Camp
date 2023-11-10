
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: campground.geometry.coordinates,
        zoom: 8
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
            .setHTML(
                `<h3>${camground.title}</h3><p>${camground.location}</p>`
            )
    )
    .addTo(map)

