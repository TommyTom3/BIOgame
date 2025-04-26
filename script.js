document.addEventListener('DOMContentLoaded', () => {
    // Select all nav links (buttons and dropdown items)
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
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

            // If the clicked link is the Games button, do nothing (let dropdown handle it)
            if (targetId === 'games' && link.classList.contains('nav-button')) {
                return;
            }

            // Remove active class from all nav links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to the clicked link (only for dropdown items)
            if (link.classList.contains('dropdown-item')) {
                link.classList.add('active');
            }

            // Hide all content sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });

            // Show the target section
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Toggle dropdown visibility on Games button click
    const gamesButton = document.querySelector('.nav-button[data-target="games"]');
    const dropdownContent = document.querySelector('.dropdown-content');
    gamesButton.addEventListener('click', () => {
        dropdownContent.classList.toggle('show');
    });

    // Close dropdown if clicking outside
    document.addEventListener('click', (e) => {
        if (!gamesButton.contains(e.target) && !dropdownContent.contains(e.target)) {
            dropdownContent.classList.remove('show');
        }
    });
});