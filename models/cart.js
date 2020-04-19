module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.add = function (item, plombName, count) {
        let storeItem = this.items[plombName];
        if(!storeItem) {
            this.totalQty++;
            storeItem = this.items[plombName] = {item: item, price: 0, count: count ? Number.parseInt(count) : 100};
        }

        let price = Number.parseFloat(storeItem.item.price.ru.split(/(\s+)/)[0]);
        storeItem.count = count ? Number.parseInt(count) : 100;
        storeItem.price = price * storeItem.count;
        let priceTmp = 0;
        for(key in this.items){
            priceTmp+=this.items[key].price;
        }
        this.totalPrice = priceTmp;
    };

    this.delete = function (plombName) {
        let price = this.items[plombName].price;
        this.totalPrice -= Number.parseFloat(price);
        this.totalQty--;
        delete this.items[plombName]
    };

    this.generateArray = function () {
        let arr = [];
        for(let name in this.items){
            arr.push(this.items[name])
        }
        return arr;
    };
};