const randomButton = document.querySelector('#random-button')
const dateForm = document.querySelector('#date-form')
const mainBody = document.querySelector('#main-body')
const key = 'lIPjB34bKNMNRL3XnpgxdsPhtxeS86WXyhA4ceYi'
const dateInput = document.querySelector


function pictureGenerator(apod) {
    // const exp = apod.explanation.split('<br>')[0];
    mainBody.innerHTML = `
        <div class="media">
            <img class="apod-pic" src="${apod.hdurl}" alt="Astronomy Picture of the Day">
        </div>
        <div class="credit">
            Credit: ${apod.copyright}
        </div>
        <div class="description">
            ${apod.explanation}
        </div>`
}
function videoGenerator(apod) {
    mainBody.innerHTML = `
    <div class="media">
    <iframe src="${apod.url}" frameborder="0"></iframe>
    </div>
    <div class="credit">
        Credit: ${apod.copyright}
    </div>
    <div class="description">
        ${apod.explanation}
    </div>`
}
function otherGenerator(apod) {
    mainBody.innerHTML = `
        <div class="media">
            <img class="apod-pic" src="./img/sorry.jpeg" alt="Sorry">
            <p>
                Sorry This date has an image that cannot be loaded
            </p>
        </div>
        <div class="credit">
            Credit: ${apod.copyright}
        </div>
        <div class="description">
            ${apod.explanation}
        </div>`
}
function mediaSort(data) {
    if (data.media_type == 'image') {
        pictureGenerator(data)
    }
    else if (data.media_type == 'video') {
        videoGenerator(data)
    }
    else {
        otherGenerator(data)
    }
}

fetch(`https://api.nasa.gov/planetary/apod?api_key=lIPjB34bKNMNRL3XnpgxdsPhtxeS86WXyhA4ceYi`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        mediaSort(data)
    })

randomButton.addEventListener('click', () => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&count=1`)
        .then(res => res.json())
        .then(data => {
            console.log(data[0]);
            mainBody.innerHTML = '';
            mediaSort(data[0]);
        })
})

dateForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const dateInput = document.querySelector('#date-selector')
    console.log(dateInput.value)
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&date=${dateInput.value}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            mainBody.innerHTML = '';
            mediaSort(data);
        })

})
