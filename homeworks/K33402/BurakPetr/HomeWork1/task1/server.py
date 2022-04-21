import socket

server = socket.socket()
host = '127.0.0.1'
port = 8000
server.bind((host, port))
server.listen()

const, addr = server.accept()
data = const.recv(16384).decode('utf-8')
print(data)
const.send(b'Hello, client\n')
const.close()