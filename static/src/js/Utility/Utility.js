//Utility class with static functions. 
//----------------------------------------------------//
export class Utility {
  static sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  static max(arr) {
    return arr.reduce(function (a, b) {
      return Math.max(a, b);
    })
  }

  static fractionate(val, minVal, maxVal) {
    return (val - minVal) / (maxVal - minVal);
  }

  static modulate(val, minVal, maxVal, outMin, outMax) {
    let fr = fractionate(val, minVal, maxVal);
    let delta = outMax - outMin;
    return outMin + (fr * delta);
  }

  static avg(arr) {
    let total = arr.reduce(function (sum, b) {
      return sum + b;
    });
    return (total / arr.length);
  }

  static sigmoid(scale, z) {
    return 1 / (1 + Math.exp(-(z - (scale * 2)) / scale))
  }

}