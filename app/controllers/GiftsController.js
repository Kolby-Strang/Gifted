import { AppState } from "../AppState.js";
import { giftsService } from "../services/GiftsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawSandboxGifts() {
    let content = ''
    const gifts = AppState.gifts
    gifts.forEach(gift => content += gift.SandboxGiftTemplate)
    setHTML('gift-container', content)
}


export class GiftsController {
    constructor() {
        // Pop.success("Gifts constructor")
        this.getSandboxGifts()
        AppState.on('gifts', _drawSandboxGifts)
    }

    async getSandboxGifts() {
        try {
            await giftsService.getSandboxGifts()
        } catch (error) {
            Pop.error('Bad job')
            console.error(error)
        }
    }

    async openGift(giftId) {
        try {
            const yes = await Pop.confirm('<img class="img-fluid" src="https://media1.giphy.com/media/2aRKlYAOQnSB8ai2Qp/giphy.gif?cid=ecf05e47hf3c13rt4cnfk8nl6fanhsn8fqnt3znshupwskhd&ep=v1_gifs_search&rid=giphy.gif&ct=g">')
            if (yes) {
                await giftsService.openGift(giftId)
            }
        } catch (error) {
            Pop.error(error)
            console.error(error);
        }
    }

    async createGift(event) {
        try {
            event.preventDefault()
            let form = event.target
            let giftData = getFormData(form)
            await giftsService.createGift(giftData)
            Pop.success('Its lit fam')
            form.reset()
        } catch (error) {
            Pop.error(error)
            console.error(error);

        }
    }
}