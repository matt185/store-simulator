import {
    partialAuth
} from "../constant"
const isAuth = (item) => {
    if (item) {
        if (partialAuth.includes(item.role)) {
            return true;
        }
    }
    return false;
}

export default isAuth