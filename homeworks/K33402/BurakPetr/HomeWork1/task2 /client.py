import socket

conn = socket.socket()
conn.connect(('127.0.0.1', 8000))

conn.send(input("Первая сторона").encode())
conn.send(input("Вторая сторона").encode())
hypotenuse_conn = conn.recv(16384)
hypotenuse = hypotenuse_conn.decode('utf-8')
print(hypotenuse)
conn.close()
