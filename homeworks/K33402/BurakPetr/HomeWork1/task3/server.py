import socket
import sys


class MyHTTPServer:

    def __init__(self, host, port, name):

        self.host = host
        self.port = port
        self.name = name

    # 1. Запуск сервера на сокете, обработка входящих соединений
    def serve_forever(self):
        # создание сокета
        conn = socket.socket(# задамем семейство протоколов 'Интернет' (INET)
            socket.AF_INET,  # задаем тип передачи данных 'потоковый' (TCP)
            socket.SOCK_STREAM)# выбираем протокол 'по умолчанию' для TCP, т.е. IP
        conn.bind((self.host, self.port))
        conn.listen(10)

        while True:
            # Ждем пользователя
            client_sock, client_addr = conn.accept()
            self.serve_client(client_sock)

    def serve_client(self, client_sock):
        # 2. Обработка клиентского подключения и вызываем parse_request
        data = client_sock.recv(16384)
        data = data.decode('utf-8')
        url, method, headers, body = self.parser_request(data)
        resp = self.handle_request(url, method, body)

        if resp:
            self.send_response(client_sock, resp)

    def parser_request(self, data):
        # 3. Разбивает данные на куски
        data = data.replace('\r', '')
        lines = data.split('\n')

        method, url, protocol = lines[0].split()
        i = lines.index('')
        headers = lines[1:i]
        body = lines[-1]

        return url, method, headers, body

    # 4.  совершает проверку. И смотрит какой запрос пришел
    def handle_request(self, url, method, body):

        if url == "/":

            if method == "GET":
                response = "HTTP/1.1 200 OK\n\n"

                with open('index.html', 'r') as f:
                    response += f.read()
                return response

            if method == "POST":
                newText = body.split('&')

                for a in newText:
                    if a.split('=')[0] == 'subject':
                        subjects.append(a.split('=')[1])

                    if a.split('=')[0] == 'mark':
                        marks.append(a.split('=')[1])

                response = "HTTP/1.1 200 OK\n\n"
                response += '<html>' \
                        '<head>' \
                        '<title>appraisals</title>' \
                        '</head>' \
                        '<body><table border=2>'
                for s, m in zip(subjects, marks):
                    response += f"<tr><td>{s}</td><td>{m}</td></tr>"
                response += "</table></body></html>"
                return response

    def send_response(self, client_sock, resp):
        # 5. Функция для отправки ответа
        client_sock.send(resp.encode('utf-8'))


if __name__ == '__main__':
    host = '127.0.0.1'
    port = 5010
    name = 'localhost'
    serv = MyHTTPServer(host, port, name)
    subjects = []
    marks = []
    try:
        serv.serve_forever()
    except KeyboardInterrupt:
        pass
