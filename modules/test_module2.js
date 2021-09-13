const area = {
    square: (length) => {
        return length * length;
    },
    circle: radius => {
        return Math.PI * radius ** 2;
    },
    rectangle: (width, height) => {
        return width * height;
    }
}
// 하나의 객체만 내보내고 싶을때 사용
module.exports = area;