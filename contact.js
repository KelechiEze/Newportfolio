document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        emailSend();
    });
});

function emailSend() {
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    const body = `
        Name: ${name}<br>
        Email: ${email}<br>
        Subject: ${subject}<br>
        Message: ${message}
    `;

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "kelechieze2000@gmail.com",
        Password: "96EAA3A40C17BF2961A732398E025249DA35",
        To: 'kelechieze400@gmail.com',
        From: "kelechieze2000@gmail.com",
        Subject: subject,
        Body: body
    }).then(
        message => alert(message)
    ).catch(
        error => alert("Failed to send message: " + error)
    );
}
