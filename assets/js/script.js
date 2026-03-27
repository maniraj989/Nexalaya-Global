document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Toggle icon between bars and close (x)
            const icon = mobileMenuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Dropdown Menu Toggle (For "when mouse clicks on it" requirement & Mobile)
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle .nav-arrow');
    dropdownToggles.forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent navigating if wrapped in a tag
            e.stopPropagation();
            
            const dropdownItem = arrow.closest('.dropdown');
            const dropdownMenu = dropdownItem.querySelector('.dropdown-menu');
            
            if (dropdownMenu) {
                dropdownMenu.classList.toggle('show');
                // Rotate arrow
                if (dropdownMenu.classList.contains('show')) {
                    arrow.style.transform = 'rotate(180deg)';
                } else {
                    arrow.style.transform = 'rotate(0deg)';
                }
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
                const arrow = menu.closest('.dropdown').querySelector('.nav-arrow');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            });
        }
    });

    // Sticky Header
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Initialize tsParticles for hero section background (Stars preset)
    if (typeof tsParticles !== 'undefined') {
        tsParticles.loadPreset("particles-js", "stars").then(container => {
            // tsParticles loaded
            console.log("particles loaded");
        });
    }

});
