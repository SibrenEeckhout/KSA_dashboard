const BASE_URL = "http://192.168.56.56/api/"

export default class ApiService{
    async get(endpoint){
        const response = await fetch(`${BASE_URL}${endpoint}`);
        const data = await response.json();
        return data;
    }

    async post(endpoint, body = null, bearerToken = null) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`
            },
            body: JSON.stringify(body)
        };
    
        const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
        const status = response.status;
        const data = await response.json();
        return { status, data };
    }

    async update(type, bodyData, bearerToken = null){
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`
            },
            body: JSON.stringify(bodyData)
        };

        const response = await fetch(BASE_URL + type, requestOptions);
        const data = await response.json();
        return data;
    }

    async delete(endpoint, bearerToken = null){
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`
            },
        };

        await fetch(`${BASE_URL}${endpoint}`, requestOptions);
    }
}