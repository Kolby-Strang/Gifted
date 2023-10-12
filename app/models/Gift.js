export class Gift {
    constructor(data) {
        this.tag = data.tag
        this.url = data.url
        this.opened = data.opened
        this.id = data.id
    }

    get SandboxGiftTemplate() {
        if (this.opened) {
            return `
            <div class="col-4 p-1">
                <div class="card p-2">
                    <img class="gift-img"
                        src="${this.url}"
                        alt="${this.tag}">
                    <p class="text-center">${this.tag}</p>\
                </div>
            </div>
            `
        } else {
            return `
            <div class="col-4 p-1">
                <div class="p-2 card bg-unopened">
                    <div onclick="app.GiftsController.openGift('${this.id}')" role="button" class="unopened-info">
                        <p class="fs-5">Title</p>
                        <p class="text-secondary">Click to open</p>
                    </div>
                </div>
            </div>
            `
        }
    }

}