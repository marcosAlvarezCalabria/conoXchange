document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const toggle = document.querySelector('.navbar-toggle');
    const mobileMenu = document.getElementById('mobile-menu-dropdown');

    // Hamburger inner spans for animation
    const hamburgerSpans = document.querySelectorAll('.hamburger-inner');

    // Mobile Menu Toggle
    if (toggle && mobileMenu) {
        toggle.addEventListener('click', () => {
            // Toggle menu visibility classes
            const isOpen = !mobileMenu.classList.contains('invisible');

            if (isOpen) {
                // Close
                mobileMenu.classList.add('invisible', 'scale-y-0', 'opacity-0');
                mobileMenu.classList.remove('scale-y-100', 'opacity-100');

                // Reset hamburger icon (simple approach: remove 'active' state logic if we implement animation via classes)
                // For now, let's just use simple rotation if desired, or keep it standard.
                // Assuming we want to animate the X shape:
                hamburgerSpans[0].classList.remove('rotate-45', 'translate-y-2');
                hamburgerSpans[1].classList.remove('opacity-0');
                hamburgerSpans[2].classList.remove('-rotate-45', '-translate-y-2');

            } else {
                // Open
                mobileMenu.classList.remove('invisible', 'scale-y-0', 'opacity-0');
                mobileMenu.classList.add('scale-y-100', 'opacity-100');

                // Animate to X
                hamburgerSpans[0].classList.add('rotate-45', 'translate-y-2.5'); // Adjusted for Tailwind spacing
                hamburgerSpans[1].classList.add('opacity-0');
                hamburgerSpans[2].classList.add('-rotate-45', '-translate-y-2.5'); // Adjusted
            }
        });
    }

    // Sticky Shadow & Compact Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-md', 'bg-white/95', 'dark:bg-slate-900/95', 'h-16');
            navbar.classList.remove('h-20', 'bg-white/80', 'dark:bg-slate-900/80');
            // Adjust inner container alignment if needed, but flex takes care of it.
        } else {
            navbar.classList.remove('shadow-md', 'bg-white/95', 'dark:bg-slate-900/95', 'h-16');
            navbar.classList.add('h-20', 'bg-white/80', 'dark:bg-slate-900/80');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.classList.contains('invisible')) {
            if (!mobileMenu.contains(e.target) && !toggle.contains(e.target)) {
                // Close logic repeated
                mobileMenu.classList.add('invisible', 'scale-y-0', 'opacity-0');
                mobileMenu.classList.remove('scale-y-100', 'opacity-100');

                hamburgerSpans[0].classList.remove('rotate-45', 'translate-y-2.5');
                hamburgerSpans[1].classList.remove('opacity-0');
                hamburgerSpans[2].classList.remove('-rotate-45', '-translate-y-2.5');
            }
        }
    });
});
