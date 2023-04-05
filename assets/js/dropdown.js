(function () {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const head = document.querySelector('.gh-head');
    const menu = head.querySelector('.gh-head-menu');
    const nav = menu.querySelector('.nav');
    if (!nav) return;

    const logo = document.querySelector('.gh-head-logo');
    const navHTML = nav.innerHTML;

    if (mediaQuery.matches) {
        const items = nav.querySelectorAll('li');
        items.forEach(function (item, index) {
            item.style.transitionDelay = 0.03 * (index + 1) + 's';
        });
    }

    const makeDropdown = function () {
        if (mediaQuery.matches) return;
        const submenuItems = [];

        while ((nav.offsetWidth + 64) > menu.offsetWidth) {
            if (nav.lastElementChild) {
                submenuItems.unshift(nav.lastElementChild);
                nav.lastElementChild.remove();
            } else {
                return;
            }
        }

        if (!submenuItems.length) {
            document.body.classList.add('is-dropdown-loaded');
            return;
        }

        const toggle = document.createElement('button');
        toggle.setAttribute('class', 'nav-more-toggle');
        toggle.setAttribute('aria-label', 'More');
        toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor"><path d="M21.333 16c0-1.473 1.194-2.667 2.667-2.667v0c1.473 0 2.667 1.194 2.667 2.667v0c0 1.473-1.194 2.667-2.667 2.667v0c-1.473 0-2.667-1.194-2.667-2.667v0zM13.333 16c0-1.473 1.194-2.667 2.667-2.667v0c1.473 0 2.667 1.194 2.667 2.667v0c0 1.473-1.194 2.667-2.667 2.667v0c-1.473 0-2.667-1.194-2.667-2.667v0zM5.333 16c0-1.473 1.194-2.667 2.667-2.667v0c1.473 0 2.667 1.194 2.667 2.667v0c0 1.473-1.194 2.667-2.667 2.667v0c-1.473 0-2.667-1.194-2.667-2.667v0z"></path></svg>';

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'gh-dropdown');

        if (submenuItems.length >= 10) {
            document.body.classList.add('is-dropdown-mega');
            wrapper.style.gridTemplateRows = 'repeat(' + Math.ceil(submenuItems.length / 2) + ', 1fr)';
        } else {
            document.body.classList.remove('is-dropdown-mega');
        }

        submenuItems.forEach(function (child) {
            wrapper.appendChild(child);
        });

        toggle.appendChild(wrapper);
        nav.appendChild(toggle);

        document.body.classList.add('is-dropdown-loaded');

        toggle.addEventListener('click', function () {
            document.body.classList.toggle('is-dropdown-open');
        });

        window.addEventListener('click', function (e) {
            if (!toggle.contains(e.target) && document.body.classList.contains('is-dropdown-open')) {
                document.body.classList.remove('is-dropdown-open');
            }
        });
    }

    imagesLoaded(head, function () {
        makeDropdown();
    });

    window.addEventListener('resize', function () {
        setTimeout(function () {
            nav.innerHTML = navHTML;
            makeDropdown();
        }, 1);
    });
})();

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
    const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
    const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
    const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
    const dropDownWrapperParent = dropDownWrapper.parentElement;
    const dropDownWrapperUpperParent = dropDownWrapperParent.parentElement;
    const html = document.getElementsByTagName("html");
    const dropChevron = dropDownWrapperUpperParent.querySelector(".fa-chevron-down");
    dropDownBtn.addEventListener('click', function (e) {
        dropDownList.classList.toggle('dropdown__list--visible');
        this.classList.add('dropdown__button--active');
        dropDownListItems.forEach((dropDownListItem) => {
            if (dropDownListItem.value = dropDownBtn.value) {
                dropDownListItem.classList.add("chousen");
            } else {
                return false;
            }
        })
    });
    dropDownListItems.forEach(function (listItem) {
        listItem.addEventListener('click', function (e) {
            e.stopPropagation();
            dropDownBtn.innerText = this.dataset.value;
            dropDownBtn.focus();
            dropDownList.classList.remove('dropdown__list--visible');
            html[0].lang = this.dataset.value;
        });
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
            dropDownBtn.classList.remove('dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
        }
    });

    if(dropChevron) {
        dropChevron.addEventListener('click', function () {
            dropDownList.classList.toggle('dropdown__list--visible');
            dropDownBtn.classList.add('dropdown__button--active');
            dropDownListItems.forEach((dropDownListItem) => {
                if (dropDownListItem.value = dropDownBtn.value) {
                    dropDownListItem.classList.add("chousen");
                } else {
                    return false;
                }
            })
            html[0].lang = this.dataset.value;
        });
    }
});