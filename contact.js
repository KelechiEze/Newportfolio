document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Capture form field values
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    try {
        // Send the data to the server
        const response = await fetch('https://newportfolio-jlo8.onrender.com/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, subject, message }),
        });

        const data = await response.json();

        // Check if the response is successful
        if (response.ok) {
            alert(data.message);

            // Clear the input fields after successful submission
            document.querySelector('input[name="name"]').value = '';
            document.querySelector('input[name="email"]').value = '';
            document.querySelector('input[name="subject"]').value = '';
            document.querySelector('textarea[name="message"]').value = '';
        } else {
            alert('Failed to send message');
        }
    } catch (error) {
        alert('Failed to send message');
    }
});
