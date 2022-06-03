import axios from "axios"

async function auth(req: any, res: any, next: any) {
    const token: string = req.headers["authorization"].replace("Bearer ", "")
    axios.get("http://localhost:3000/auth/check", {
            data: {
                "token" : token
            }
    }).then(response => {
        if (response.status == 200) {
            next()
        }
        else {
            res.status(401).send("")
        }
    }).catch(error => {
        res.status(401).send("")
    })
}

export default auth