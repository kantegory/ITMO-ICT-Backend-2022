import socket

server = socket.socket()
host = '127.0.0.1'
port = 8000
server.bind((host, port))
server.listen()

conn, addr = server.accept()
first = int(conn.recv(16384).decode('utf-8'))
second = int(conn.recv(16384).decode('utf-8'))
print(first, second, sep='\n')

hypotenuse = str((first ** 2 + second ** 2) ** (1 / 2))
conn.send(hypotenuse.encode())
conn.close()
