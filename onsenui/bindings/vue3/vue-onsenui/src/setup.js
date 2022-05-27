export default function(ons) {
  return Object.keys(ons)
    .filter(k => [
      /^is/,
      /^disable/,
      /^enable/,
      /^mock/,
      /^open/,
      /^set/,
      /animit/,
      /elements/,
      /GestureDetector/,
      /notification/,
      /orientation/,
      /platform/,
      /ready/,
    ].some(t => k.match(t)))
    .reduce((r, k) => {
      r[k] = ons[k];
      return r;
    }, { _ons: ons });
}
