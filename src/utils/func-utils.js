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
export const isObjectValueEqual = (obj1: any, obj2: any) => {
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
    let a1 = Object.prototype.toString.call(obj1[attr]) === '[object Object]';
    let a2 = Object.prototype.toString.call(obj2[attr]) === '[object Object]';
    let arr1 = Object.prototype.toString.call(obj1[attr]) === '[object Array]';
    if (a1 && a2) {
      // 如果是对象继续判断
      return isObjectValueEqual(obj1[attr], obj2[attr]);
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
};

/**
 * 判断是否为数字类型
 */
export const isDigit = value => {
  let patrn = /^[0-9]*$/;
  if (patrn.exec(value) == null || value === '') {
    return false;
  } else {
    return true;
  }
};

/**
 * 千分位
 */
export const Convert = money => {
  let s = money; //获取小数型数据
  s += '';
  if (s.indexOf('.') === -1) {
    s += '.00';
  } //如果没有小数点，在后面补个小数点和00
  if (/\.\d$/.test(s)) {
    s += '0';
  } //正则判断
  while (
    /\d{4}(\.|,)/.test(s) //符合条件则进行替换
  ) {
    s = s.replace(/(\d)(\d{3}(\.|,))/, '$1,$2');
  } //每隔3位添加一个
  return s;
};

// 定义一个深拷贝函数  接收目标target参数
export const deepClone = target => {
  // 定义一个变量
  let result;
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = []; // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]));
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null;
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target;
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {};
      for (let i in target) {
        result[i] = deepClone(target[i]);
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target;
  }
  // 返回最终结果
  return result;
};
