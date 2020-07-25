function binarySearch(nums, target) {
  // 检索范围: [left, right] [left, mid-1] mid [mid+1, right]
  let left = 0;
  let right = nums.length - 1; // 注意

  while (left <= right) {
    const mid = (left + (right - left) / 2) | 0;
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    // 注意
    else if (nums[mid] > target) right = mid - 1;
    // 注意
  }
  return -1;
}

function leftBound(nums, target) {
  // 检索范围： [left, right)  [left, mid) mid [mid+1, right)
  if (nums.length === 0) return -1;
  let left = 0;
  let right = nums.length; // 注意

  while (left < right) {
    // 注意
    const mid = ((left + right) / 2) | 0;
    if (nums[mid] === target) {
      right = mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid; // 注意
    }
  }
  // target 比所有数都大
  if (left === nums.length) return -1;
  // 类似之前算法的处理方式
  return nums[left] === target ? left : -1;
}

function leftBound2(nums, target) {
  // 检索范围： [left, right] [left, mid-1] mid [mid+1, right]
  if (nums.length === 0) return -1;
  let left = 0;
  let right = nums.length - 1; // 注意

  while (left <= right) {
    // 注意
    const mid = (left + (right - left) / 2) | 0;
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1; // 注意
    } else if (nums[mid] === target) {
      right = mid - 1;
    }
  }
  // 检查出界情况
  if (left >= nums.length || nums[left] !== target) return -1;
  return left;
}

function rightBound(nums, target) {
  // 检索范围 ：[left, right) [left, mid) mid [mid+1, right)
  if (nums.length === 0) return -1;
  let left = 0;
  let right = nums.length; // 注意

  while (left < right) {
    // 注意
    const mid = ((left + right) / 2) | 0;
    if (nums[mid] === target) {
      left = mid + 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid; // 注意
    }
  }
  if (left === 0) return -1;
  return nums[left - 1] === target ? left - 1 : -1;
}

function rightBound2(nums, target) {
  // 检索范围 ：[left, right] [left, mid-1] mid [mid+1, right]
  if (nums.length === 0) return -1;
  let left = 0;
  let right = nums.length - 1; // 注意

  while (left <= right) {
    // 注意
    const mid = (left + (right - left) / 2) | 0;
    if (nums[mid] === target) {
      left = mid + 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1; // 注意
    }
  }
  // 这里改为检查 right 越界的情况，见下图
  if (right < 0 || nums[right] !== target) return -1;
  return right;
}
console.log(leftBound2([2, 3, 5, 7], 4));
