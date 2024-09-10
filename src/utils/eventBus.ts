class eventBus {
  events: Record<string, Set<() => void>> = {}
  on(name: string, event: () => void) {
    ;(this.events[name] ??= new Set()).add(event)
  }
  emit(name: string) {
    if (this.events[name]) {
      this.events[name].forEach((e) => {
        e()
      })
    }
  }
  off(name: string, event: () => void) {
    if (this.events[name]) {
      this.events[name].delete(event)
    }
  }
  once(name: string, event: () => void) {
    const fn = () => {
      event()
      this.off(name, event)
    }
    this.events[name].add(fn)
  }
}

const events = new eventBus()
export default events
