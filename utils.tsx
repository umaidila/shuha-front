export const setProfileName = async () => {
    try {
        const response = await fetch(backUrl + "/register", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: emailText,
                password: passwordText,
            }),
        })
    }
}