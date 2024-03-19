document.getElementById("sendEmail").addEventListener("click", function() {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "your_email@gmail.com",
      Password: "your_password",
      To: 'recipient@example.com',
      From: "your_email@gmail.com",
      Subject: "Email Subject",
      Body: "Email Content",
    })
    .then(function(message) {
      alert("Email sent successfully");
    });
  });
  