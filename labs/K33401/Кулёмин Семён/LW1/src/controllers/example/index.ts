class ExampleController {
    get = async (request: any, response: any) => {
        response.send('Hello, world!')
    }
}

export default ExampleController