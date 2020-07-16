// function fib(N) {
//   if (N < 1) return 0;
//   const memo = {};
//   return helper(memo, N);
// }
// function helper(memo, n) {
//   // base case
//   if (n === 1 || n === 2) return 1;
//   // use memo
//   if (typeof memo[n] !== "undefined") return memo[n];
//   // if no memo calc memo
//   memo[n] = helper(memo, n - 1) + helper(memo, n - 2);
//   return memo[n];
// }
// function fib(N) {
//   if (N < 1) return 0;
//   const memo = Array(N + 1).fill(0);
//   return helper(memo, N);
// }
// function helper(memo, n) {
//   // base case
//   if (n === 1 || n === 2) return 1;
//   // use memo
//   if (memo[n] !== 0) return memo[n];
//   // if no memo calc memo
//   memo[n] = helper(memo, n - 1) + helper(memo, n - 2);
//   return memo[n];
// }

// function fib(N) {
//   if (N === 2 || N === 1) return 1;
//   let prev = 1,
//     curr = 1;
//   for (let i = 3; i <= N; i++) {
//     let sum = prev + curr;
//     prev = curr;
//     curr = sum;
//   }
//   return curr;
// }

// console.time("带缓存时间");
// console.log(fib(22222));
// console.timeEnd("带缓存时间");

// 凑硬币问题
function coinChange (coins, amount) {
  const dp = Array(amount + 1).fill(amount + 1)
  dp[0]    = 0
  dp.forEach((item, index) => {
    coins.forEach(coin => {
      if (index - coin < 0) return
      dp[index] = Math.min(dp[index], 1 + dp[index - coin])
    })
  })
  return dp[amount] === amount + 1 ? -1 : dp[amount]
}

console.log(coinChange([1, 2, 5], 11))
