import { onUnmounted } from 'vue'
interface SocketOptions {
  heartbeatInterval?: number
  reconnectInterval?: number
  maxReconnectAttempts?: number
}

class Socket {
  url: string
  token: string
  ws: WebSocket | null = null
  opts: SocketOptions
  reconnectAttempts: number = 0
  listeners: { [key: string]: Function[] } = {}
  heartbeatInterval: number | null = null
  private static socket: Socket
  public static getInstance(url: string = '', token: string = '', opts: SocketOptions = {}) {
    //可以搞一个import.meta.url这样子就不用参数了
    if (this.socket) {
      return this.socket
    } else {
      this.socket = new Socket(url, token, opts)
      return this.socket
    }
  }
  constructor(url: string, token: string = '', opts: SocketOptions = {}) {
    this.url = url
    this.token = token
    this.opts = {
      heartbeatInterval: 30000, //心跳
      reconnectInterval: 5000, // 重连时间
      maxReconnectAttempts: 5, //重新连接次数
      ...opts
    }

    this.init()
  }

  init() {
    if (this.token !== '') this.ws = new WebSocket(this.url, [this.token])
    else this.ws = new WebSocket(this.url)
    this.ws.onopen = this.onOpen.bind(this)
    this.ws.onmessage = this.onMessage.bind(this)
    this.ws.onerror = this.onError.bind(this)
    this.ws.onclose = this.onClose.bind(this)
  }

  onOpen(event: Event) {
    console.log('WebSocket opened:', event)
    this.reconnectAttempts = 0
    this.startHeartbeat()
    this.emit('open', event)
  }

  onMessage(event: MessageEvent) {
    console.log('WebSocket message received:', event.data)
    this.emit('message', event.data)
  }

  onError(event: Event) {
    console.error('WebSocket error:', event)
    this.emit('error', event)
  }

  onClose(event: CloseEvent) {
    console.log('WebSocket closed:', event)
    this.stopHeartbeat()
    this.emit('close', event)

    if (this.reconnectAttempts < this.opts.maxReconnectAttempts!) {
      setTimeout(() => {
        this.reconnectAttempts++
        this.init()
      }, this.opts.reconnectInterval)
    }
  }

  startHeartbeat() {
    if (!this.opts.heartbeatInterval) return

    this.heartbeatInterval = window.setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send('ping')
      }
    }, this.opts.heartbeatInterval)
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  send(data: string) {
    console.error('给socket发送消息============>', data)
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(data)
    } else {
      console.error('WebSocket is not open. Cannot send:', data)
    }
  }
  close() {
    console.error('给socket关闭============>')
    this.ws?.close()
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event: string) {
    if (this.listeners[event]) {
      delete this.listeners[event]
    }
  }

  emit(event: string, data: any) {
    this.listeners[event]?.forEach((callback) => callback(data))
  }
}

export function useSocket(url: string, token: string = '', opts: SocketOptions = {}) {
  const socket = new Socket(url, token, opts)

  onUnmounted(() => {
    socket.off('open')
    socket.off('message')
    socket.off('error')
    socket.off('close')
    socket.close()
  })

  return {
    socket,
    send: socket.send.bind(socket),
    on: socket.on.bind(socket),
    off: socket.off.bind(socket),
    close: socket.close.bind(socket)
  }
}
