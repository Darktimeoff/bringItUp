export default class RequestService {
    static async postRequest(data, url) {
        try {
            const request = new Request(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return _useRequest(request)
        } catch (error) {
            console.error(error)
        }
    }

    static async postFormData(data, url) {
        try {
            const request = new Request(url, {
                method: 'POST',
                body: data
            });
            return _useRequestFormData(request);
        } catch (error) {
            console.error(error)
        }
    }

    static async getRequest(url) {
        try {
            const request = new Request(url);
            return _useRequest(request);
        } catch (error) {
            console.error(error);
        }
    }
}

async function _useRequest(request) {
    const response = await fetch(request);
    return await response.json()
}

async function _useRequestFormData(request) {
    const response = await fetch(request);
    return await response.text()
}