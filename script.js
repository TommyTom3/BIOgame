document.addEventListener('DOMContentLoaded', () => {
    // Select all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    // Select all content sections 
    const contentSections = document.querySelectorAll('.content-section');

    // Show "About" by default
    document.getElementById('about').classList.add('active');

    // Add click event listeners to nav links 
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents default link behavior

            // Get the target section ID from data-target
            const targetId = link.getAttribute('data-target');

            // Hide all content sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });

            // Show the target section
            document.getElementById(targetId).classList.add('active');

        });
    });
});