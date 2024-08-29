document.getElementById('bookForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    var formData = new FormData(this);

    fetch('Book_insert.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Trigger success animation and clear the form
            triggerSuccessAnimation();
            clearForm();
        } else {
            // Trigger error animation with the error message
            triggerErrorAnimation(data.message);
        }
    })
     
    
});

function clearForm() {
    document.getElementById('bookForm').reset();
}

function triggerSuccessAnimation() {
    var animationDiv = document.createElement('div');
    animationDiv.className = 'success-animation';
    animationDiv.innerHTML = '<p>✔ Book Inserted Successfully!</p>';

    document.body.appendChild(animationDiv);

    setTimeout(() => {
        animationDiv.style.opacity = '0';
        setTimeout(() => {
            animationDiv.remove();
        }, 1000);
    }, 3000);
}

function triggerErrorAnimation(message) {
    var animationDiv = document.createElement('div');
    animationDiv.className = 'error-animation';
    animationDiv.innerHTML = `<p>✖ ${message}</p>`;

    document.body.appendChild(animationDiv);

    setTimeout(() => {
        animationDiv.style.opacity = '0';
        setTimeout(() => {
            animationDiv.remove();
        }, 1000);
    }, 3000);
}
const video = document.getElementById('background-video');
        video.playbackRate = 1;
