// 判断两个对象是否相等，该函数有缺陷，不能判断值为null的情况，可以作为参考
// export function isObjectValueEqual(a, b) {
//   let aProps = Object.getOwnPropertyNames(a);
//   let bProps = Object.getOwnPropertyNames(b);
//   if (aProps.length !== bProps.length) {
//     return false;
//   }
//   for (let i = 0; i < aProps.length; i++) {
//     let propName = aProps[i];
//
//     let propA = a[propName];
//     let propB = b[propName];
//
//     console.log("%%%%%%%%%%%%%%%%%=");
//     if (typeof propA === "object") {
//       if (this.isObjectValueEqual(propA, propB)) {
//         return true;
//       } else {
//         return false;
//       }
//     } else if (propA !== propB) {
//       return false;
//     } else {
//     }
//   }
//   return true;
// }

// 判断两个对象是否相等
export function isObjectValueEqual(obj1, obj2) {
  let o1 = obj1 instanceof Object;
  let o2 = obj2 instanceof Object;
  if (!o1 || !o2) {
    // 如果不是对象 直接判断数据是否相等
    return obj1 === obj2;
  }
  // 判断对象的可枚举属性组成的数组长度
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  for (let attr in obj1) {
    let a1 = Object.prototype.toString.call(obj1[attr]) === "[object Object]";
    let a2 = Object.prototype.toString.call(obj2[attr]) === "[object Object]";
    let arr1 = Object.prototype.toString.call(obj1[attr]) === "[object Array]";
    if (a1 && a2) {
      // 如果是对象继续判断
      return this.isObjectValueEqual(obj1[attr], obj2[attr]);
    } else if (arr1) {
      // 如果是对象 判断
      if (obj1[attr].toString() !== obj2[attr].toString()) {
        return false;
      }
    } else if (obj1[attr] !== obj2[attr]) {
      // 不是对象的就判断数值是否相等
      return false;
    }
  }
  return true;
}
