export const headers = {
    "Accept": "application/json",
    "Authorization": "Bearer " + localStorage.getItem('access_token')
}

export const headersMultipart = {
    "Accept": "application/json",    
    "Content-Type": "multipart/form-data",
    "Authorization": "Bearer " + localStorage.getItem('access_token')
}