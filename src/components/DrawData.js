const GiftList = [{
        name: "黃金卡",
        icon: "/images/icon01.png",
    },
    {
        name: "丸子",
        icon: "/images/icon02.png",
    },
    {
        name: "火箭",
        icon: "/images/icon03.png",
    },
    {
        name: "彈夾",
        icon: "/images/icon04.png",
    },
    {
        name: "豆腐丸",
        icon: "/images/icon05.png",
    },
    {
        name: "飛船",
        icon: "/images/icon06.png",
    },
    {
        name: "飞机",
        icon: "/images/icon07.png",
    },
    {
        name: "超級火箭",
        icon: "/images/icon08.png",
    },
    {
        name: "止痛藥",
        icon: "/images/icon09.png",
    },
    {
        name: "給力",
        icon: "/images/icon10.png",
    },
    {
        name: "火箭",
        icon: "/images/icon03.png",
    },
    {
        name: "彈夾",
        icon: "/images/icon04.png",
    },
    {
        name: "豆腐丸",
        icon: "/images/icon05.png",
    },
    {
        name: "飛船",
        icon: "/images/icon06.png",
    },
    {
        name: "飞机",
        icon: "/images/icon07.png",
    },
    {
        name: "超級火箭",
        icon: "/images/icon08.png",
    },
    {
        name: "止痛藥",
        icon: "/images/icon09.png",
    },
    {
        name: "給力",
        icon: "/images/icon10.png",
    },
]
// random
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// add props
for (let i = 0; i < GiftList.length; i++) {
    GiftList[i].id = i + 1
    GiftList[i].count = getRandomNum(1, 10)
}
// out
function getGift(index) {
    if (index) {
        return GiftList[index]
    } else {
        return GiftList
    }
}

export {
    getGift
}