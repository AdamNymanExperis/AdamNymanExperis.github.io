
export async function fetchLaptops(){
    try {
        const response = await fetch('https://hickory-quilled-actress.glitch.me/computers')
        const data = await response.json()
        return data
    } catch(error){
        console.log(error)
    }
}

export async function fetchImage(imageUrl){
    try {
        const response = await fetch('https://hickory-quilled-actress.glitch.me/' + imageUrl)
        const imageBlob = await response.blob()
        const localImageUrl = URL.createObjectURL(imageBlob)
        return localImageUrl
    } catch(error){
        console.log("not working")
        /*
        const split = imageUrl.split('.')
        const end = split[1]
        if(end === 'jpg'){
            end = 'png'
            imageUrl = split[0] + '.' + end
            fetchImage(imageUrl)
        }
        else if (end === 'png'){
            end = 'jpg'
            imageUrl = split[0] + '.' + end
            fetchImage(imageUrl)
        }
        else {
            console.log(error)
        }
        */
    }
}



