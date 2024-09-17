document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Capture form field values
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    // Show the loading overlay
    const loaderOverlay = document.getElementById('loader-overlay');
    loaderOverlay.style.display = 'flex';  // Show the loader by setting display to flex

    // Create or clear previous success message element
    let successMessageElement = document.getElementById('success-message');
    if (!successMessageElement) {
        successMessageElement = document.createElement('div');
        successMessageElement.id = 'success-message';
        successMessageElement.style.position = 'fixed';
        successMessageElement.style.bottom = '20px';
        successMessageElement.style.right = '20px';
        successMessageElement.style.padding = '10px';
        successMessageElement.style.backgroundColor = '#4CAF50';
        successMessageElement.style.color = 'white';
        successMessageElement.style.borderRadius = '5px';
        successMessageElement.style.zIndex = '1000';
        successMessageElement.style.opacity = '0'; // Start with hidden
        successMessageElement.style.transition = 'opacity 1s ease'; // Smooth transition
        document.body.appendChild(successMessageElement);
    } else {
        successMessageElement.style.opacity = '0'; // Start fade-out transition
    }

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

        // Hide the loader immediately
        loaderOverlay.style.display = 'none';

        // Check if the response is successful
        if (response.ok) {
            // Show success message
            successMessageElement.textContent = data.message;
            successMessageElement.style.backgroundColor = '#4CAF50'; // Green for success
            successMessageElement.style.opacity = '1'; // Fade-in transition

            // Clear the input fields after successful submission
            document.querySelector('input[name="name"]').value = '';
            document.querySelector('input[name="email"]').value = '';
            document.querySelector('input[name="subject"]').value = '';
            document.querySelector('textarea[name="message"]').value = '';

            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessageElement.style.opacity = '0'; // Fade-out transition
            }, 3000); // 3000 milliseconds = 3 seconds
        } else {
            successMessageElement.textContent = 'Failed to send message';
            successMessageElement.style.backgroundColor = '#f44336'; // Red for error
            successMessageElement.style.opacity = '1'; // Fade-in transition
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessageElement.style.opacity = '0'; // Fade-out transition
            }, 3000); // 3000 milliseconds = 3 seconds
        }
    } catch (error) {
        // Hide the loader immediately on error
        loaderOverlay.style.display = 'none';
        successMessageElement.textContent = 'Failed to send message';
        successMessageElement.style.backgroundColor = '#f44336'; // Red for error
        successMessageElement.style.opacity = '1'; // Fade-in transition
        // Hide success message after 3 seconds
        setTimeout(() => {
            successMessageElement.style.opacity = '0'; // Fade-out transition
        }, 3000); // 3000 milliseconds = 3 seconds
    }
});
