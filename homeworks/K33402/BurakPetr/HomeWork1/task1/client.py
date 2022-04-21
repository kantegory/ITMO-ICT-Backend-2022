import socket

const = socket.socket()
const.connect(('127.0.0.1', 8000))
const.send(b'Hello, server')

print(const.recv(16384).decode('utf-8'))

const.close()
