
// Load the electrical companies data
const fetchData = async () => {
    try {
        const response = await fetch('attached_assets/bamaelectric.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        return [];
    }
};

// Update the page content based on the URL parameter
const updatePageContent = async () => {
    const data = await fetchData();
    
    // Get the 's' parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const companySlug = params.get('s');
    
    // Find the company with matching slug
    const company = data.find(item => item.s === companySlug);
    
    // If company is found, update the page content
    if (company) {
        // Update page title
        document.title = company.name + ' - Electrical Services';
        
        // Update company name in header and footer
        const companyNameElements = document.querySelectorAll('#company-name, #footer-company-name, #copyright-name');
        companyNameElements.forEach(el => {
            el.textContent = company.name;
        });
        
        // Update hero section
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) {
            heroTitle.textContent = `Quality Electrical Services by ${company.name}`;
        }
        
        const heroSubtitle = document.getElementById('hero-subtitle');
        if (heroSubtitle) {
            heroSubtitle.textContent = `Professional, reliable, and experienced electrical contractors serving ${company.city}, ${company.state}`;
        }
        
        // Update about section
        const companyRating = document.getElementById('company-rating');
        if (companyRating) {
            companyRating.textContent = company.rating;
        }
        
        const companyReviews = document.getElementById('company-reviews');
        if (companyReviews) {
            companyReviews.textContent = `${company.reviews}+`;
        }
        
        const companyLocation = document.getElementById('company-location');
        if (companyLocation) {
            companyLocation.textContent = company.city;
        }
        
        const aboutDescription = document.getElementById('about-description');
        if (aboutDescription) {
            aboutDescription.textContent = `${company.name} is a leading electrical service provider in ${company.city}, ${company.state}, dedicated to delivering high-quality electrical services for residential, commercial, and industrial clients. With years of experience and a team of certified professionals, we ensure that all your electrical needs are met safely and efficiently.`;
        }
        
        // Update contact information
        const companyPhone = document.getElementById('company-phone');
        if (companyPhone) {
            companyPhone.textContent = company.phone;
        }
        
        const companyEmail = document.getElementById('company-email');
        if (companyEmail) {
            companyEmail.textContent = company.email_1;
        }
        
        const companyAddress = document.getElementById('company-address');
        if (companyAddress) {
            companyAddress.textContent = `${company.street}, ${company.city}, ${company.state} ${company.postal_code}`;
        }
        
        // Update social media links
        const facebookLink = document.getElementById('facebook-link');
        if (facebookLink && company.facebook) {
            facebookLink.href = company.facebook;
        }
        
        // Initialize map if it exists
        const mapElement = document.getElementById('map');
        if (mapElement && company.latitude && company.longitude) {
            initMap(company);
        }
    }
    
    // Ensure all links maintain the URL parameter
    updateLinks(companySlug);
    
    // Initialize animation on scroll
    initScrollAnimation();
};

// Update all navigation links to maintain the URL parameter
const updateLinks = (companySlug) => {
    if (!companySlug) return;
    
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        // Skip external links and anchor links
        if (link.href.startsWith('http') && !link.href.includes(window.location.hostname)) return;
        if (link.href.includes('#') && !link.href.includes('.html')) return;
        
        // Get the href attribute
        const href = link.getAttribute('href');
        
        // Skip links that already have the parameter
        if (href.includes('?s=')) return;
        
        // Add the parameter to the link
        link.href = href.includes('?') 
            ? `${href}&s=${companySlug}` 
            : `${href}?s=${companySlug}`;
    });
};

// Initialize map using company location data
const initMap = (company) => {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Create a simple map representation using the coordinates
    const latitude = company.latitude;
    const longitude = company.longitude;
    
    // Create an iframe with OpenStreetMap 
    mapElement.innerHTML = `
        <iframe 
            width="100%" 
            height="100%" 
            frameborder="0" 
            scrolling="no" 
            marginheight="0" 
            marginwidth="0" 
            src="https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01}%2C${latitude - 0.01}%2C${longitude + 0.01}%2C${latitude + 0.01}&amp;layer=mapnik&amp;marker=${latitude}%2C${longitude}" 
            style="border: none; border-radius: 10px;">
        </iframe>
        <div style="text-align: center; margin-top: 10px;">
            <a href="${company.location_link}" target="_blank" class="btn" style="font-size: 0.9rem; padding: 8px 15px;">
                <i class="fas fa-map-marker-alt"></i> View on Google Maps
            </a>
        </div>
    `;
};

// Initialize animation for elements when they scroll into view
const initScrollAnimation = () => {
    const animateElements = document.querySelectorAll('.service-card, .info-item, .about-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Execute when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    updatePageContent();
    
    // Add scrolled class to header when scrolling
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Update current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});
