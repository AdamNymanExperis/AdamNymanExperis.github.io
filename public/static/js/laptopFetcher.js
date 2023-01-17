
export async function fetchLaptops() {
    try {
        const response = await fetch('https://hickory-quilled-actress.glitch.me/computers')
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}


