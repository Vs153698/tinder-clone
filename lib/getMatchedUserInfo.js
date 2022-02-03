const getMatchedUserInfo = (userdata, userLoggedIn) => {
    const newUsers = { ...userdata }
    delete newUsers[userLoggedIn]
    const [id, user] = Object.entries(newUsers).flat()
    return {id,...user};
}
export default getMatchedUserInfo