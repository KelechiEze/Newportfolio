document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    try {
        const response = await fetch('https://newportfolio-jlo8.onrender.com/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, subject, message }),
        });

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert('Failed to send message');
    }
});