export default function _fetch(path, json){
    console.log("JSONS", json)

    return fetch(path, {
        method : 'POST',
        mode : "cors",
        cache : "no-cache",
        credentials : "same-origin",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(json)
    })
}