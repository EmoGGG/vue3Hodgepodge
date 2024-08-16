const antiShake = (time: number, fn: () => any): (() => any) => {
  let timer: any = null
  const fnn = () => {
    if (timer === null) {
      timer = setTimeout(() => {
        timer = null
      }, time)
      fn()
    }
  }
  return fnn
}

export default antiShake
