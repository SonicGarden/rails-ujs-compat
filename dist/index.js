const confirmEvent = (message, event) => {
    if (!window.confirm(message)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }
};
const startConfirm = () => {
    document.addEventListener('submit', (event) => {
        const { target } = event;
        const form = target instanceof HTMLElement && target.closest('form[data-confirm]');
        if (!form)
            return;
        confirmEvent(form.dataset.confirm, event);
    });
    document.addEventListener('click', (event) => {
        const { target } = event;
        const element = target instanceof HTMLElement && target.closest('button[data-confirm], input[data-confirm]');
        if (!element)
            return;
        confirmEvent(element.dataset.confirm, event);
    });
};
export const csrfToken = () => { var _a; return (_a = document.querySelector('meta[name=csrf-token]')) === null || _a === void 0 ? void 0 : _a.content; };
const ENABLE_ATTRIBUTE_NAME = 'data-ujs-compat-enable';
const FORM_DISABLE_SELECTOR = 'input[data-disable-with], input[data-disable], button[data-disable-with], button[data-disable]';
const disableFormElement = (element) => {
    if (element.hasAttribute(ENABLE_ATTRIBUTE_NAME) || element.disabled)
        return;
    element.disabled = true;
    element.setAttribute(ENABLE_ATTRIBUTE_NAME, '1');
};
const startDisableForm = () => {
    document.addEventListener('submit', (event) => {
        const { target } = event;
        const form = target instanceof HTMLElement && target.closest('form');
        if (!form)
            return;
        setTimeout(() => {
            const elements = form.querySelectorAll(FORM_DISABLE_SELECTOR);
            for (const element of elements)
                disableFormElement(element);
        }, 13);
    });
    // NOTE: For back forward cache
    document.addEventListener('DOMContentLoaded', () => {
        for (const element of document.querySelectorAll(`[${ENABLE_ATTRIBUTE_NAME}]`)) {
            element.removeAttribute(ENABLE_ATTRIBUTE_NAME);
            element.disabled = false;
        }
    });
};
export const start = () => {
    startConfirm();
    startDisableForm();
};
