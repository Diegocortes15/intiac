'use strict';

const overlayPopup = document.querySelector('.popup__overlay');

const navigationMobile = function () {
    const navigationCheckbox = document.querySelector('.bar-navigation__checkbox');
    const navigationMobile = document.querySelector('.navigation--mobile');
    const burgerMenu = document.querySelector('.bar-navigation__toggle-button');
    const overlay = document.querySelector('.overlay');

    navigationCheckbox.checked = true;
    navigationMobile.classList.add('hidden');

    const openMobileNav = function () {
        overlay.classList.remove('hidden');
        navigationMobile.classList.remove('hidden');
        burgerMenu.innerHTML = '';
        burgerMenu.insertAdjacentHTML(
            'beforeend',
            `
            <svg class="bar-navigation-mobile__burguer" xmlns="http://www.w3.org/2000/svg" width="18" height="19">
                <g fill="#2D314D" fill-rule="evenodd">
                  <path d="M.868.661l16.97 16.97-.706.708L.162 1.369z" />
                  <path d="M.161 17.632L17.131.662l.708.706-16.97 16.97z" />
                </g>
              </svg>
            `
        );
    };

    const closeMobileNav = function () {
        overlay.classList.add('hidden');
        navigationMobile.classList.add('hidden');
        burgerMenu.innerHTML = '';
        burgerMenu.insertAdjacentHTML(
            'beforeend',
            `
      <svg class="bar-navigation-mobile__burguer" xmlns="http://www.w3.org/2000/svg" width="24" height="11">
          <g fill="#2D314D" fill-rule="evenodd">
            <path d="M0 0h24v1H0zM0 5h24v1H0zM0 10h24v1H0z" />
          </g>
        </svg>
      `
        );
    };

    burgerMenu.addEventListener('click', function () {
        if (navigationCheckbox.checked) {
            openMobileNav();
        }

        if (!navigationCheckbox.checked) {
            closeMobileNav();
        }
    });

    overlay.addEventListener('click', function () {
        if (!navigationCheckbox.checked) {
            navigationCheckbox.checked = true;
            closeMobileNav();
        }
    });
};
navigationMobile();

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
    entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

// Project Popup component

const projectsContainer = document.querySelector('.projects-container');
const projectsPopup = document.querySelectorAll('.project-popup');
const projectPopContainer = document.querySelector('.project-popup__container');

// Open project popup
if (projectsContainer) {
    projectsContainer.addEventListener('click', function (e) {
        const clicked = e.target.closest('.project-card');

        if (!clicked) return;

        e.preventDefault();

        // Remove active class
        projectsPopup.forEach(projectPopup =>
            projectPopup.classList.remove('project-popup--active')
        );
        overlayPopup.classList.add('hidden');

        // Active popup
        document
            .querySelector(`.project-popup--${clicked.dataset.id}`)
            .classList.add('project-popup--active');

        document
            .querySelector(`.project-popup--${clicked.dataset.id}`)
            .querySelector('.project-popup__video')
            .play();

        overlayPopup.classList.remove('hidden');
    });

    // Close project popup
    projectPopContainer.addEventListener('click', function (e) {
        const clicked = e.target.closest('.project-popup__close');

        if (!clicked) return;

        // Remove active class
        projectsPopup.forEach(function (projectPopup) {
            projectPopup.classList.remove('project-popup--active');
            projectPopup.querySelector('.project-popup__video').pause();
            projectPopup.querySelector('.project-popup__video').currentTime = 0;
        });

        // projectsPopup.forEach(projectPopup => projectPopup.classList.remove('project-popup--active'));
        overlayPopup.classList.add('hidden');
    });

    overlayPopup.addEventListener('click', function () {
        // Remove active class
        projectsPopup.forEach(function (projectPopup) {
            projectPopup.classList.remove('project-popup--active');
            projectPopup.querySelector('.project-popup__video').pause();
            projectPopup.querySelector('.project-popup__video').currentTime = 0;
        });
        overlayPopup.classList.add('hidden');
    });
}

/** Mapa Contacto */
if (document.querySelector('.section-contact__mapa')) {
    var map = L.map('section-contact__mapa').setView([4.6831, -74.0423], 16.4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([4.6831, -74.0423])
        .addTo(map)
        .bindPopup('Universidad Militar Nueva Granada')
        .openPopup();
}
