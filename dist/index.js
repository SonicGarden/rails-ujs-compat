const confirmForm = () => {
    document.addEventListener('submit', (event) => {
        const { target } = event;
        const form = target instanceof HTMLElement && target.closest('form[data-confirm]');
        if (!form)
            return;
        if (!window.confirm(form.dataset.confirm)) {
            event.preventDefault();
        }
    });
};
export const csrfToken = () => { var _a; return (_a = document.querySelector('meta[name=csrf-token]')) === null || _a === void 0 ? void 0 : _a.content; };
const disabledElements = new WeakSet();
const formDisableSelector = 'input[data-disable-with], input[data-disable], button[data-disable-with], button[data-disable]';
const disableFormElement = (element) => {
    if (disabledElements.has(element))
        return;
    element.disabled = true;
    disabledElements.add(element);
};
const disableForm = () => {
    document.addEventListener('submit', (event) => {
        const { target } = event;
        const form = target instanceof HTMLElement && target.closest('form');
        if (!form)
            return;
        setTimeout(() => {
            const elements = form.querySelectorAll(formDisableSelector);
            for (const element of elements)
                disableFormElement(element);
        }, 13);
    });
};
export const start = () => {
    confirmForm();
    disableForm();
};
