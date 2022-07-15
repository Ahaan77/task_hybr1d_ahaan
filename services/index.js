// This function lists all the news data
const listData = async (setLoader, setData) => {
    setLoader(true)
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/search?query=""`, {
            mode: "cors",
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
        const res = await response.json()
        setLoader(false)
        setData(res?.hits)

    } catch (error) {
        console.log(error)
    }

}

export default listData