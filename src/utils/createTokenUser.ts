import { CreateTokenUserInter } from "../types/functionTypes";

// const user = {
//     name: 'dachiko',
//     _id: 'dacjadjas',
//     email: 'krebsona@gmail.com',
//     password: 'asdaskdnajsdf9238he9vhvnkac.z/.xcv.',
//     role: 'user',
//     verificationToken: 'asdfjasdjfasdsf',
//     isVerified: false,
//     verifiedDate: new Date()
// }
const createTokenUser:CreateTokenUserInter = (user) => {
    return { name: user.name, _id: user._id, role: user.role };
};
export default createTokenUser;