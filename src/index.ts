const confirmEvent = (message: string, event: Event) => {
  if (!window.confirm(message)) {
    event.preventDefault()
    event.stopPropagation()
    event.stopImmediatePropagation()
  }
}

const startConfirm = () => {
  document.addEventListener('submit', (event) => {
    const { target } = event
    const form = target instanceof HTMLElement && target.closest<HTMLFormElement>('form[data-confirm]')
    if (!form) return

    confirmEvent(form.dataset.confirm!, event)
  })

  document.addEventListener('click', (event) => {
    const { target } = event
    const element =
      target instanceof HTMLElement && target.closest<HTMLElement>('button[data-confirm], input[data-confirm]')
    if (!element) return

    confirmEvent(element.dataset.confirm!, event)
  })
}

export const csrfToken = (): string | undefined =>
  document.querySelector<HTMLMetaElement>('meta[name=csrf-token]')?.content

const ENABLE_ATTRIBUTE_NAME = 'data-ujs-compat-enable'

const FORM_DISABLE_SELECTOR =
  'input[data-disable-with], input[data-disable], button[data-disable-with], button[data-disable]'

type FormSubmitElement = HTMLInputElement | HTMLButtonElement

const disableFormElement = (element: FormSubmitElement) => {
  if (element.hasAttribute(ENABLE_ATTRIBUTE_NAME) || element.disabled) return
  element.disabled = true
  element.setAttribute(ENABLE_ATTRIBUTE_NAME, '1')
}

const startDisableForm = () => {
  document.addEventListener('submit', (event) => {
    const { target } = event
    const form = target instanceof HTMLElement && target.closest('form')
    if (!form) return

    setTimeout(() => {
      const elements = form.querySelectorAll<FormSubmitElement>(FORM_DISABLE_SELECTOR)
      for (const element of elements) disableFormElement(element)
    }, 13)
  })

  // NOTE: For back forward cache
  document.addEventListener('DOMContentLoaded', () => {
    for (const element of document.querySelectorAll<FormSubmitElement>(`[${ENABLE_ATTRIBUTE_NAME}]`)) {
      element.removeAttribute(ENABLE_ATTRIBUTE_NAME)
      element.disabled = false
    }
  })
}

export const start = () => {
  startConfirm()
  startDisableForm()
}
