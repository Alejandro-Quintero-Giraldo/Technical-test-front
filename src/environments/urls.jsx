export const urls = {
    getMessage: `action/getMessage`,
    saveUser: `user/save`,
    findById: (userId) => `user/findById/${userId}`,
    findAll: `user/findAll`,
    delete: (userId) =>  `user/delete/${userId}`
}
