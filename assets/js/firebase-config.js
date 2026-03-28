// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// TODO: Replace the following with your app's Firebase project configuration
// 1. Go to Firebase Console (console.firebase.google.com)
// 2. Create a Project and Register a Web App
// 3. Copy the "firebaseConfig" object below
const firebaseConfig = {
    apiKey: "AIzaSyBqhjLwtpo37xG_tehEjo_z4gqsoQr014g",
    authDomain: "nexalaya-global.firebaseapp.com",
    projectId: "nexalaya-global",
    storageBucket: "nexalaya-global.firebasestorage.app",
    messagingSenderId: "912366500582",
    appId: "1:912366500582:web:8d6fb4300129e6ba8ed927",
    measurementId: "G-KGJ2QMX4FL",
    databaseURL: "https://nexalaya-global-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const formStatus = document.getElementById("formStatus");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Store original button text and disable it to prevent multiple clicks
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = "Submitting...";
            submitBtn.disabled = true;

            // Reset status message
            formStatus.style.display = "none";
            formStatus.className = "";

            // Gather Form Data
            const formData = {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                email: document.getElementById("email").value,
                mobile: document.getElementById("mobile").value,
                destination: document.getElementById("destination").value,
                course: document.getElementById("course").value,
                month: document.getElementById("month").value,
                year: document.getElementById("year").value,
                consent: document.getElementById("consent").checked,
                createdAt: serverTimestamp()
            };

            try {
                // 1. Save Data to Firebase Realtime Database
                // We save it to a list named "enquiries"
                const enquiriesRef = ref(db, 'enquiries');
                const newEnquiryRef = await push(enquiriesRef, formData);
                console.log("Document written with ID: ", newEnquiryRef.key);

                // 2. Send Email via EmailJS
                // NOTE: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual values from EmailJS dashboard
                const emailParams = {
                    from_name: `${formData.firstName} ${formData.lastName}`,
                    from_email: formData.email,
                    mobile: formData.mobile,
                    destination: formData.destination,
                    course: formData.course,
                    timing: `${formData.month} ${formData.year}`,
                };

                // Send Email via EmailJS
                await emailjs.send('service_nexalaya', 'template_8sf39rd', emailParams);
                console.log("Email sent successfully!");

                // Show success message
                formStatus.innerHTML = "Thank you! Your enquiry has been submitted successfully.";
                formStatus.style.display = "block";
                formStatus.style.backgroundColor = "#d4edda";
                formStatus.style.color = "#155724";
                formStatus.style.border = "1px solid #c3e6cb";

                // Reset form
                contactForm.reset();

            } catch (error) {
                console.error("Error adding document: ", error);

                // Show error message with the exact reason
                formStatus.innerHTML = `Oops! Something went wrong: <strong>${error.message || "Please try again later"}</strong>`;
                formStatus.style.display = "block";
                formStatus.style.backgroundColor = "#f8d7da";
                formStatus.style.color = "#721c24";
                formStatus.style.border = "1px solid #f5c6cb";
            } finally {
                // Restore button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
