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

const startDisableForm = () => {
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
  startConfirm()
  startDisableForm()
}
