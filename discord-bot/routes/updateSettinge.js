export const updateSettinge = async (state) => {
    console.log(process.env.API_URL)
    const myHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.BACKEND_TOKEN}`,
    }

    const payload = {data: {isClosed: state}}

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: 'follow',
    }

    try {
        const response = await fetch(
            `${process.env.API_URL}/api/site-setting`,
            requestOptions
        )
        const result = await response.text()
        console.log(result)
    } catch (error) {
        console.log('error', error)
    }
}
