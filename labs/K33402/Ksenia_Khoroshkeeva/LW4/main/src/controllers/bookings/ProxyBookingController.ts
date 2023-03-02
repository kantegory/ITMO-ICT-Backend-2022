import axios from "axios";

class ProxyBookingController {
    private async requestProxy(url: string, method: any, response: any, body: any = null) {
        // Функция для отправки запросов другому сервису
        axios({
            method: method,
            url: `http://booking:8001${url}`,
            data: body
        }).then((proxyResponse) =>{
            response.status(proxyResponse.status).send(proxyResponse.data);
        }).catch((proxyError) => {
            if (proxyError.response) {
                response.status(proxyError.response.status).send(proxyError.response.data);
            } else {
                response.status(500).send({"error": proxyError.message});
            }
        })
    }

    get = async (request: any, response: any) => {
        // Получение конкретного бронирования пользователя
        const id = request.params.id;
        const userId = request.user.id;
        await this.requestProxy(`/api/bookings/${id}?userId=${userId}`, 'get', response);
    }

    list = async (request: any, response: any) => {
        // Список бронирований пользователя
        const userId = request.user.id;
        await this.requestProxy(`/api/bookings?userId=${userId}`, 'get', response);
    }

    create = async (request: any, response: any) => {
        // Создание бронирования
        const body = request.body;
        const userId = request.user.id;
        await this.requestProxy(`/api/bookings?userId=${userId}`, 'post', response, body);
    }
}

export default ProxyBookingController;
