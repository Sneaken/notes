// 模拟数据
const data = [];
for (let i = 1; i < 30; i++) {
  data.push({
    date: `${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, 0)}-${i.toString().padStart(2, 0)}`,
    percent: `${parseInt(Math.random() * 100 + 1, 10)}`
  });
}

/**
 * 获取当月最后一天
 * @param {*} year
 * @param {*} month
 */
function mGetDate(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
}

// 将数据均分为7份 显示
let result = [];
if (data.lengt > 0 && data.length < 7) {
  result = [...data];
  let count = 7 - data.length;
  const length = data.length;
  const StepSize =
    (mGetDate(new Date().getFullYear, new Date().getMonth + 1) -
      data[length - 1].date.substring(3)) /
    count;
  result[6] = {
    date:
      `${(new Date().getMonth() + 1).toString().padStart(2, 0)}-` +
      mGetDate(new Date().getFullYear, new Date().getMonth + 1),
    percent: ""
  };
  for (let i = 1; i < count; i++) {
    result[length - 1 + i] = {
      date:
        data[0].date.substring(1, 3).toString() + Math.round(5 + StepSize * i),
      percent: ""
    };
  }
} else if (data.length === 7) {
  result = [...data];
} else if (data.length > 7) {
  result = [...data];
  let collect = [];
  collect[0] = data[0];
  collect[6] = data[data.length - 1];
  const StepSize = (data.length - 2) / 5;
  for (let i = 1; i <= 5; i++) {
    collect[i] = data[Math.round(StepSize * i)];
  }
  for (let i = 0; i < data.length; i++) {
    if (!collect.includes(result[i])) {
      result[i].date = "";
    }
  }
}

let x = result.map(item => item.date);
let y = result.map(item => item.percent);
console.log(x);
console.log(y);
