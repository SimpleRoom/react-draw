const GiftList = [{
        name: "黃金卡",
        icon: "/images/icon01.png",
        left: "0",
        top: "0",
    },
    {
        name: "丸子",
        icon: "/images/icon02.png",
        left: "92px",
        top: "0",
    },
    {
        name: "火箭",
        icon: "/images/icon03.png",
        left: "184px",
        top: "0",
    },
    {
        name: "彈夾",
        icon: "/images/icon04.png",
        left: "276px",
        top: "0",
    },
    {
        name: "豆腐丸",
        icon: "/images/icon05.png",
        left: "368px",
        top: "0",
    },
    {
        name: "飛船",
        icon: "/images/icon06.png",
        left: "460px",
        top: "0",
    },
    {
        name: "飞机",
        icon: "/images/icon07.png",
        left: "460px",
        top: "92px",
    },
    {
        name: "超級火箭",
        icon: "/images/icon08.png",
        left: "460px",
        top: "184px",
    },
    {
        name: "止痛藥",
        icon: "/images/icon09.png",
        left: "460px",
        top: "276px",
    },
    {
        name: "給力",
        icon: "/images/icon10.png",
        left: "460px",
        top: "368px",
    },
    {
        name: "火箭",
        icon: "/images/icon03.png",
        left: "368px",
        top: "368px",
    },
    {
        name: "彈夾",
        icon: "/images/icon04.png",
        left: "276px",
        top: "368px",
    },
    {
        name: "豆腐丸",
        icon: "/images/icon05.png",
        left: "184px",
        top: "368px",
    },
    {
        name: "飛船",
        icon: "/images/icon06.png",
        left: "92px",
        top: "368px",
    },
    {
        name: "飞机",
        icon: "/images/icon07.png",
        left: "0",
        top: "368px",
    },
    {
        name: "超級火箭",
        icon: "/images/icon08.png",
        left: "0",
        top: "276px",
    },
    {
        name: "止痛藥",
        icon: "/images/icon09.png",
        left: "0",
        top: "184px",
    },
    {
        name: "給力",
        icon: "/images/icon10.png",
        left: "0",
        top: "92px",
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