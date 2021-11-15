import { genderList } from "../data/genderList"



export const genderTool = {
    getGenderName: (genderValue) => {
        return genderList.find(item => item.value === genderValue)?.name || "";
    }
}