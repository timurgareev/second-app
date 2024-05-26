// class ApiService {
//     _apiBase = "http://localhost:8080/api/v1/";

//     getResource = async (url) => {
//         let res = await fetch(url);
    
//         if (!res.ok) {
//             throw new Error(`Could not fetch ${url}, status: ${res.status}`);
//         }
    
//         return await res.json();
//     }

//     getAllObjects = async() => {
//         const res = await this.getResource('${this._apiBase}groups')
//         return res.data.result.map
//     }
// }

class ApiService {
    _apiBase = "http://localhost:8080/api/v1/";

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllObjects = async () => {
        const res = await this.getResource(`${this._apiBase}groups`);
        return res;
        // return res.data.result.map(this._transformObject);
    }

    getDrawingsById = async (id) => {
        const res = await this.getResource(`${this._apiBase}drawings/${id}`);
        return res;
    }


// _transformObject = (object) => {
//     return {
//         id: object.id,
//         name: object.name,
//         projects: object.projects.map(project => ({
//             id: project.id,
//             name: project.name,
//             zones: project.zones.map(zone => ({
//                 id: zone.id,
//                 name: zone.name,
//                 drawings: zone.drawings.map(drawing => ({
//                     id: drawing.id,
//                     code: drawing.code
//                 }))
//             }))
//         }))
//     };
// }
}


export default ApiService;
