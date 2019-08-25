setInterval(function () {
    let image_id_number = Math.floor(Math.random() * 90) + 5;
    document.getElementById('image_placeholder').src = 'https://picsum.photos/' + image_id_number;
}, 3000);