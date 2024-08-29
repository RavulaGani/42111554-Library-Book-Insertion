<?php
include("dbcon.php");

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $bookId = $_POST['bookId'];
    $bookName = $_POST['bookName'];
    $authorName = $_POST['authorName'];
    $publicationYear = $_POST['publicationYear'];

    // Check if the bookId already exists in the database
    $checkQuery = $conn->prepare("SELECT bookId FROM books WHERE bookId = ?");
    $checkQuery->bind_param("s", $bookId);
    $checkQuery->execute();
    $checkQuery->store_result();

    if ($checkQuery->num_rows > 0) {
        // Book ID already exists
        echo json_encode(['status' => 'error', 'message' => 'Book ID already exists']);
    } else {
        // Insert the new book data
        $stmt = $conn->prepare("INSERT INTO books (bookId, bookName, authorName, publicationYear) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sssi", $bookId, $bookName, $authorName, $publicationYear);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => $stmt->error]);
        }

        $stmt->close();
    }

    $checkQuery->close();
    $conn->close();
}
