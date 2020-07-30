(function() {
  function minWindow(s, t) {
    // 记录最短子串的开始位置和长度
    let start = 0;
    let minLen = Number.MAX_SAFE_INTEGER;
    let left = 0;
    let right = 0;

    const window = {};
    const needs = {};

    for (let c of t) {
      if (!needs[c]) needs[c] = 0;
      needs[c]++;
    }

    let match = 0;
    const needsLen = Object.keys(needs).length;

    while (right < s.length) {
      let c1 = s[right];
      if (needs[c1]) {
        if (!window[c1]) window[c1] = 0;
        window[c1]++;
        if (window[c1] === needs[c1]) match++;
      }
      right++;
      // window 中的字符串已符合 needs 的要求了
      while (match === needsLen) {
        if (right - left < minLen) {
          // 更新最小子串的位置和长度
          start = left;
          minLen = right - left;
        }
        let c2 = s[left];
        if (needs[c2]) {
          window[c2]--;
          if (window[c2] < needs[c2]) match--;
        }
        left++;
      }
    }
    return minLen === Number.MAX_SAFE_INTEGER
      ? ""
      : s.substring(start, start + minLen);
  }

  const S = "ADOBECODEBANCBAC";
  const T = "ABC";
  console.log(minWindow(S, T));
})();

(function() {
  function maxSum(arr, k) {
    const len = arr.length;
    if (len < k) return -1;

    let sum = 0;
    for (let i = 0; i < k; i++) {
      sum += arr[i];
    }
    let result = sum;
    for (let i = k; i < len; i++) {
      sum += arr[i] - arr[i - k];

      result = Math.max(sum, result);
    }

    return result;
  }

  console.log(maxSum([100, 200, 300, 400], 2));
})();

(function() {
  function lengthOfLongestSubstring(str) {
    const map = {};

    let left = 0;
    let right = 0;

    let max = 0;
    while (right < str.length) {
      if (!map[str[right]]) {
        map[str[right]] = 1;
        right++;
      } else {
        while (left < right) {
          delete map[str[left]];
          if (map[str[left++]] === map[str[right]]) {
            break;
          }
        }
      }
      max = Math.max(max, right - left);
    }

    return max;
  }

  console.log(lengthOfLongestSubstring("abddcaddbdcbb"));
})();

!(function() {
  function findAnagrams(s, t) {
    const result = [];
    const need = {};
    const window = {};
    for (let c of t) {
      if (!need[c]) need[c] = 0;
      need[c]++;
    }

    let left = 0,
      right = 0;
    let valid = 0;
    while (right < s.length) {
      // c 是将移入窗口的字符
      const c = s[right];
      // 右移窗口
      right++;
      // 进行窗口内数据的一系列更新
      if (need[c]) {
        if (!window[c]) {
          window[c] = 0;
        }
        window[c]++;
        if (need[c] === window[c]) {
          valid++;
        }
      }

      /*** debug 输出的位置 ***/
      console.log(`window: [${left}, ${right}]`);
      /********************/

      // 判断左侧窗口是否要收缩
      while (right - left >= t.length) {
        if (valid === Object.keys(need).length) {
          result.push(left);
        }
        // d 是将移出窗口的字符
        const d = s[left];
        // 左移窗口
        left++;
        // 进行窗口内数据的一系列更新
        if (need[d]) {
          if (window[d] === need[d]) {
            valid--;
          }
          window[d]--;
        }
      }
    }
    return result;
  }

  console.log(findAnagrams("cbaebabacd", "abc"));
})();
