const axios = require('axios')

const sender = '639f5c843501a6439491a4f6'
const recipient = '63a7307040e6219c0a73a9f0'
const chat = '63c3bd5df5c1d7a634c24528'
const message = 'test message'
const user = '63a247c2b6b65f94d9ef39a1'

const authHeader = {
    'Content-type': 'application/json',
    'Authorization': '{"token":{"userId":"639f5c843501a6439491a4f6","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzM1NTAyNjksImlhdCI6MTY3MzQ2Mzg2OSwic3ViIjoiNjM5ZjVjODQzNTAxYTY0Mzk0OTFhNGY2In0.mSOLpvU_dS_bAw_0l2r4k8274ZbO78HFw2dGk8B3eGQ","tokenType":"Bearer"}}',
}

/* 
for (let i = 0; i < 8; i++) {

    axios.post(`http://cathost.ddns.net/chats/${chat}`, {
        sender: recipient,
        text: message
    }, {
        headers: authHeader
    })
    .catch(err => console.log(err.response.data))

}
*/

axios.post('http://cathost.ddns.net/chats', {
    participants: [sender, recipient]
})
    .catch(err => console.error(err.response.data))


/* axios.delete(`http://cathost.ddns.net/users/${user}`)
    .catch(err => console.error(err.response.data)) */

/* axios.delete(`http://cathost.ddns.net/chats/${chat}`)
    .catch(err => console.error(err.response.data))
     */