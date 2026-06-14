import { Comment, Forum } from "./definitions";

export function mergeSortComment(arr: Comment[]): Comment[] {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);

  let left: Comment[] = mergeSortComment(arr.slice(0, mid));
  let right: Comment[] = mergeSortComment(arr.slice(mid));
  return mergeComment(left, right);
}

function mergeComment(left: Comment[], right: Comment[]): Comment[] {
  const result: Comment[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i]._count.likes >= right[j]._count.likes) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}

export function mergeSortForum(arr: Forum[]): Forum[] {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);

  let left: Forum[] = mergeSortForum(arr.slice(0, mid));
  let right: Forum[] = mergeSortForum(arr.slice(mid));
  return mergeForum(left, right);
}

function mergeForum(left: Forum[], right: Forum[]): Forum[] {
  const result: Forum[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i]._count.likes >= right[j]._count.likes) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}
