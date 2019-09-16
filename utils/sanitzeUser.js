// Function for restriction of user info
module.exports = (user) => {
    return user.map(x => ({
        user: { name: x.name, id: x._id, mass: x.mass, volume: x.volume, address: x.address },
        coords:{
            longitude: x.longitude,
            latitude: x.latitude }
    }));
};