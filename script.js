function calculateBMI() {
  var weight = parseFloat(document.getElementById("weight").value);
  var height = parseFloat(document.getElementById("height").value);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    document.getElementById("error").innerHTML =
      "Please enter valid weight and height.";
  } else {
    document.getElementById("error").innerHTML = "";
    // Convert height to meters
    height = height / 100;

    // Calculate BMI
    var bmi = weight / (height * height);

    // Determine BMI category
    var category = "";
    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "Healthy Weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    // Display the result
    document.getElementById("bmiresult").innerHTML =
      "Your BMI is: " + bmi.toFixed(2);

    document.getElementById("category").innerHTML = "Your are: " + category;
  }
}

// Get the current year
var currentYear = new Date().getFullYear();

// Find the <span> element by its ID
var yearSpan = document.getElementById("currentYear");

// Update the content of the <span> with the current year
yearSpan.textContent = currentYear;

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Create a transporter object for sending email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: "",
    pass: "",
  },
});

app.post("/submit-form", (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  // Define the email data
  const mailOptions = {
    from: "",
    to: "",
    subject: "New Form Submission",
    text: `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Email not sent");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
