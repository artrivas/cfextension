document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
    const handle = document.getElementById("username").value;
    fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert("worked");
        mergeproblems();
    })
    .catch(error => {
        console.error('There was a problem with the API request:', error);
        alert('USER NOT FOUND');
    });
});
