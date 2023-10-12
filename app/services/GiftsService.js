import { AppState } from "../AppState.js";
import { Gift } from "../models/Gift.js";
import { api } from "./AxiosService.js"


class GiftsService {
    async getSandboxGifts() {
        const res = await api.get('api/gifts')
        // console.log('API', res.data);
        AppState.gifts = res.data.map((giftPOJO) => new Gift(giftPOJO))
        console.log("APPSTATE", AppState.gifts);
    }

    async openGift(giftId) {
        const res = await api.put(`api/gifts/${giftId}`, { opened: true })
        const giftIndex = AppState.gifts.findIndex(gift => gift.id == giftId)
        if (giftIndex == -1) return
        AppState.gifts[giftIndex] = new Gift(res.data)
        AppState.emit('gifts')
    }
    async createGift(giftData) {
        const newGift = new Gift(giftData)
        const res = await api.post('api/gifts', newGift)
        debugger
        AppState.gifts.unshift(new Gift(res.data))
        AppState.emit('gifts')
    }
}


export const giftsService = new GiftsService()