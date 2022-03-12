export const urls = {
    getMessage: (userId, userName, typeAction, languaje) => `action/getMessage/${userId}/${userName}/${typeAction}/${languaje}`,
    saveUser: `user/save`,
    findById: (userId) => `user/findById/${userId}`,
    findAll: `user/findAll`,
    delete: (userId) =>  `user/delete/${userId}`
}
