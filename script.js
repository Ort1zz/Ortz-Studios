document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    
    let lastScrollTop = 0;
    const heroSection = document.getElementById('hero');
    let heroSectionHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;

    function calculateHeroHeight() {
        const currentHeroSection = document.getElementById('hero');
        if (currentHeroSection) {
            heroSectionHeight = currentHeroSection.offsetHeight;
        } else {
            heroSectionHeight = window.innerHeight; 
        }
    }

    calculateHeroHeight();
    
    window.addEventListener('resize', calculateHeroHeight);

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop < lastScrollTop || scrollTop <= heroSectionHeight * 0.5 ) { 
            if (header) header.classList.remove('hidden-header');
        } else if (scrollTop > lastScrollTop && scrollTop > heroSectionHeight * 0.5) { 
            if (header) header.classList.add('hidden-header');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
    }, false);
    
    lucide.createIcons();
});