module.exports = async (userName, idImage, repository) => {
    // Find user
    const user = await repository.show(userName);

    // Find images array of this user
    const images = user.images;

    // FIND INDEX OF CURRENT IMAGE
    const index = images.findIndex((item) => {
        return item.id === idImage;
    })
    return {
        images, index
    }
}