const seletor = selector => document.querySelector(selector);
const selectAll = selector => document.querySelectorAll(selector);
const newElement = tag => document.createElement(tag);
const addGlobalEventListenerClosest = (event, selector, callback) => {
    document.addEventListener(event, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.closest(selector)) {
            callback(e.target.closest(selector));
        }
    });
    return false;
}

const addGlobalEventListener = (event, selector, callback) => {
    document.addEventListener(event, (e) => {
        e.stopPropagation();
        if (e.target.matches(selector)) {
            callback(e);
        }
    });
}