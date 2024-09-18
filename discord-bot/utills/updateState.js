export const updateOrderState = async (id, newState) => {
    console.log(newState)
    console.log(id)
    console.log('updating state')
    const url = `${process.env.API_URL}/api/orders/${id}`
    const data = {
        data: {
            state: newState,
        },
    }

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.BACKEND_TOKEN}`,
        },
        body: JSON.stringify(data),
        redirect: 'follow',
    }

    try {
        const response = await fetch(url, requestOptions)
        const result = await response.json() // Parse the response as JSON
        console.log(result)

        // Check if the result contains an error
        if (result.error) {
            console.error(`Error updating order state: ${result.error.message}`)
            console.error(
                `Details: ${JSON.stringify(result.error.details.errors)}`
            )
        }
    } catch (error) {
        console.error('error', error)
    }
}
