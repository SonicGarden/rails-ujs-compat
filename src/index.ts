const confirmForm = () => {
  document.addEventListener('submit', (event) => {
    const { target } = event
    const form = target instanceof HTMLElement && target.closest<HTMLFormElement>('form[data-confirm]')
    if (!form) return

    if (!window.confirm(form.dataset.confirm)) {
      event.preventDefault()
    }
  })
}

export const csrfToken = (): string | undefined => document.querySelector<HTMLMetaElement>('meta[name=csrf-token]')?.content

const disabledElements = new WeakSet<HTMLElement>()
const formDisableSelector =
  'input[data-disable-with], input[data-disable], button[data-disable-with], button[data-disable]'

type FormSubmitElement = HTMLInputElement | HTMLButtonElement

const disableFormElement = (element: FormSubmitElement) => {
  if (disabledElements.has(element)) return
  element.disabled = true
  disabledElements.add(element)
}

const disableForm = () => {
  document.addEventListener('submit', (event) => {
    const { target } = event
    const form = target instanceof HTMLElement && target.closest('form')
    if (!form) return

    setTimeout(() => {
      const elements = form.querySelectorAll<FormSubmitElement>(formDisableSelector)
      for (const element of elements) disableFormElement(element)
    }, 13)
  })
}

export const start = () => {
  confirmForm()
  disableForm()
}
