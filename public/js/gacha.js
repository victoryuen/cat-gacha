const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "live_acPHvOOQDARxB3UwZfYfjkcwT8GT1IOGpuCJCvLZdPNwUJS6jaS6lczzw04Dnjch"  // api key for cat API only for class, will be removed after graded
});

const rollGacha = async () => {
    loader.style.display = 'block';
    cat_api_section.style.display = 'none';
    try {
        const response = await axios.get("https://api.thecatapi.com/v1/images/search", {
            headers, params: {
                has_breeds: 1,
                limit: 1
            }
        });

        const catData = response.data[0];
        console.log(catData);
        loader.style.display = 'none';
        cat_api_section.style.display = 'block';
        cat_info_text.innerHTML = `
            <div class="cat-stats-box">
                <div class="cat-stat-item">
                    <span class="cat-stat-label">Breed:</span> ${catData.breeds[0].name}
                </div>
                <div class="cat-stat-item">
                    <span class="cat-stat-label">Origin:</span> ${catData.breeds[0].origin}
                </div>
                <div class="cat-stat-item">
                    <span class="cat-stat-label">Temperament:</span> ${catData.breeds[0].temperament}
                </div>
                <div class="cat-stat-item">
                    <span class="cat-stat-label">Description:</span> ${catData.breeds[0].description}
                </div>
            </div>
        `;
        cat_info_image.src = catData.url;
    } catch (error) {
        console.error('Error:', error);
        loader.style.display = 'none';
    }
}

gacha_btn = document.querySelector('#gacha-button');
cat_info_text = document.querySelector('#cat-image-response-text')
cat_info_image = document.querySelector('#cat-image')
cat_api_section = document.querySelector('#cat-image-response-container')
const loader = document.querySelector('#loader');

gacha_btn.addEventListener('click', rollGacha)