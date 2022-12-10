const linkAPI = "https://ajax.test-danit.com/api/v2/cards/";

export const sendRequest = async (entity="", method = "GET", token, config) => {
    return await fetch(`${linkAPI}${entity}`, {  //{}
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        ...config
    }).then(response => {
        if(response.ok){
            if(method !== 'DELETE'){
                return response.json()
            } else {
                return response
            }
        } else {
            return new Error(`Something went wrong with fetch request: entity - ${entity}, method - ${method}!`);
        }
    })
}

  
  
