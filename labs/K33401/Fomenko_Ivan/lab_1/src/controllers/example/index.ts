class ExampleController {

    get = async (request: any, response: any) => {
            response.send('Hello, World!')
    }
}

export default ExampleController