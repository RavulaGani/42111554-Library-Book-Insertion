# 42111554-Library-Book-Insertion
The Library Book Insertion System is a lightweight and efficient application designed to simplify the process of adding new books to a library's catalog. This system automates book cataloging by capturing critical details such as Bid,Bname, author, and publication year, ensuring an organized and error-free inventory.
Project: Library Management System DocumentaƟon
Problem statement: 
Create webpage for Library Management System to insert 
bookdetails into database(Book ID, Name of the book, Author 
Name, Year of publication) using HTML, CSS, JS, PHP and 
MYSQL. 
1.User should enter all the book details in a HTML form and the 
data should be stored into database. 
2.Files required – Book_Insert.php, dbcon.php, script.js,style.css 
Library Management System DocumentaƟon
Overview 
This system provides a user interface to insert book records into a library database. It includes a 
frontend developed with HTML, CSS, and JavaScript for form handling, and a backend developed 
with PHP and MySQL for data storage and processing. 
Table of Contents: 
 System Features
 Technologies Used
 Setup InstrucƟons
 Code Breakdown
o HTML
o CSS
o JavaScript
o PHP
o SQL
 Database Schema
 Error Handling
 Known Issues
System Features 
1. Insert New Book: The user can input a new book’s details such as Book ID, Name, Author, 
and Year of PublicaƟon.
2. Form ValidaƟon: The system validates the input and ensures the Book ID is unique. 
3. Error Handling: Displays error messages and animaƟons when a book already exists or input 
is invalid. 
4. Success NoƟficaƟon: A success animaƟon is triggered when a new book is successfully 
inserted. 
5. Background Video: Provides a background video for visual enhancement. 
Technologies Used 
 Frontend: HTML, CSS, JavaScript 
 Backend: PHP 
 Database: MySQL 
Icons & Fonts: Google Fonts, PNG Icons 
Setup InstrucƟons
1. Database Setup: 
 Create a MySQL database called library_management. 
 Import the following SQL structure for the books table: 
sql 
CREATE TABLE books ( 
 bookId VARCHAR(255) PRIMARY KEY, 
 bookName VARCHAR(255), 
 authorName VARCHAR(255), 
 publicaƟonYear INT
); 
2. Server Setup: 
 Install a local or remote web server with PHP and MySQL support. 
 Place the project files in the server's root directory. 
 Update the database connecƟon details in dbcon.php:
php 
$servername = "localhost"; 
$username = "Gani"; 
$password = "Ganesh@4598"; 
$dbname = "library_management"; 
3. Run the ApplicaƟon:
 Access the applicaƟon through a web browser (e.g., hƩp://localhost/library-managementsystem). 
Code Breakdown 
HTML 
Structure: 
 The HTML file contains the structure for the Library Management System interface. 
 A form is created to take inputs like Book ID, Book Name, Author Name, and PublicaƟon Year.
html 
<form id="bookForm" acƟon="Book_insert.php" method="POST">
 <input type="text" id="bookId" name="bookId" placeholder="Enter Book ID" required> 
 <input type="text" id="bookName" name="bookName" placeholder="Enter Book Name" 
required> 
 <input type="text" id="authorName" name="authorName" placeholder="Enter Author Name" 
required> 
 <input type="number" id="publicaƟonYear" name="publicaƟonYear" placeholder="Enter Year" 
required> 
 <buƩon type="submit" class="submit-btn">Insert Book</buƩon>
</form> 
Media IntegraƟon:
 A video is added as a background using the <video> tag, set to autoplay and loop. 
html 
<video id="background-video" class="video-background" autoplay loop muted playsinline> 
 <source src="media/library.mp4" type="video/mp4"> 
</video> 
CSS 
Styling: 
 Main Container: Centers the form with responsive design. 
 Navbar and Form Styling: Styled to be clean and professional with hover effects on buƩons.
 AnimaƟons: Includes success and error animaƟons displayed when a book is added or when 
an error occurs. 
css 
/* Success AnimaƟon */
.success-animaƟon {
 posiƟon: fixed;
 top: 50%; 
 leŌ: 50%;
 background-color: #4CAF50; 
 padding: 20px; 
 color: white; 
 border-radius: 8px; 
} 
/* Error AnimaƟon */
.error-animaƟon {
 posiƟon: fixed;
 top: 50%; 
 leŌ: 50%;
 background-color: #f44336; 
 padding: 20px; 
 color: white; 
 border-radius: 8px; 
} 
JavaScript 
AJAX Submission: 
 Handles form submission via AJAX to prevent page reload. Sends data to Book_insert.php 
and processes the response. 
javascript 
document.getElementById('bookForm').addEventListener('submit', funcƟon (event) {
 event.preventDefault(); // Prevent default form submission 
 var formData = new FormData(this); 
 
 fetch('Book_insert.php', { 
 method: 'POST', 
 body: formData 
 }) 
 .then(response => response.json()) 
 .then(data => { 
 if (data.status === 'success') { 
 triggerSuccessAnimaƟon();
 clearForm(); 
 } else { 
 triggerErrorAnimaƟon(data.message);
 } 
 }); 
}); 
AnimaƟons:
 Success and error animaƟons are triggered upon form submission based on the response 
from the server. 
javascript 
Copy code 
funcƟon triggerSuccessAnimaƟon() {
 var animaƟonDiv = document.createElement('div');
 animaƟonDiv.className = 'success-animaƟon';
 animaƟonDiv.innerHTML = '<p>✔ Book Inserted Successfully!</p>'; 
 document.body.appendChild(animaƟonDiv);
 setTimeout(() => { 
 animaƟonDiv.style.opacity = '0';
 setTimeout(() => { animaƟonDiv.remove(); }, 1000);
 }, 3000);} 
PHP
Database ConnecƟon:
 dbcon.php handles the connecƟon to the MySQL database.
php 
Copy code 
$servername = "localhost"; 
$username = "Gani"; 
$password = "Ganesh@4598"; 
$dbname = "library_management"; 
$conn = new mysqli($servername, $username, $password, $dbname); 
if ($conn->connect_error) { 
 die("ConnecƟon failed: " . $conn->connect_error); 
} 
Insert Book Data: 
 The Book_insert.php file processes form data and inserts the new book into the books table. 
It checks if the Book ID already exists and returns success or error messages. 
php 
Copy code 
if ($_SERVER['REQUEST_METHOD'] === 'POST') { 
 $bookId = $_POST['bookId']; 
 $bookName = $_POST['bookName']; 
 $authorName = $_POST['authorName']; 
 $publicaƟonYear = $_POST['publicaƟonYear'];
 // Check if the bookId already exists in the database 
 $checkQuery = $conn->prepare("SELECT bookId FROM books WHERE bookId = ?"); 
 $checkQuery->bind_param("s", $bookId); 
 $checkQuery->execute(); 
 $checkQuery->store_result(); 
 if ($checkQuery->num_rows > 0) { 
 echo json_encode(['status' => 'error', 'message' => 'Book ID already exists']); 
 } else { 
 $stmt = $conn->prepare("INSERT INTO books (bookId, bookName, authorName, publicaƟonYear) 
VALUES (?, ?, ?, ?)"); 
 $stmt->bind_param("sssi", $bookId, $bookName, $authorName, $publicaƟonYear);
 $stmt->execute(); 
 echo json_encode(['status' => 'success']); 
 } 
} 
Database Schema 
 Books Table:
Column Data Type DescripƟon
bookId VARCHAR(255) Primary Key, Unique ID 
bookName VARCHAR(255) Name of the Book 
authorName VARCHAR(255) Author's Name 
publicaƟonYear INT Year of PublicaƟon
Error Handling 
1. Duplicate Book ID: Returns an error if the Book ID already exists. 
2. ConnecƟon Error: Gracefully handles MySQL connecƟon errors with a fallback message.
Known Issues 
 None reported at this Ɵme
 
