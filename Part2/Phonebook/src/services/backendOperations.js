
const base_url = "http://localhost:3001/persons"

const getAllNumbers = () => {
    return fetch(base_url)
        .then(response => {
            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
            return response.json()
        })
}

const createNewNumber = (dataObj) => {
    return fetch(base_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj)
    })
        .then(response => {
            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
            return response.json()
        })
}

const deleteNumber = (id) => {
    return fetch(`${base_url}/${id}`, {
        method: "DELETE",
    })
        .then(response => {
            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
            return response.json()
        })
}

const updateNumber = (id, dataObj) => {
    return fetch(`${base_url}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj)
    })
        .then(response => {
            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
            return response.json()
        })
}

export default { getAllNumbers, createNewNumber, deleteNumber, updateNumber }