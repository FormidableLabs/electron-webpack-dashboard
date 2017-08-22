export default function formatSize(size, precision = 1) {
  const kb = {
    label: 'k',
    value: 1024,
  };
  const mb = {
    label: 'M',
    value: 1024 * 1024,
  };
  let denominator;

  if (size >= mb.value) {
    denominator = mb;
  } else {
    denominator = kb;
    if (size < kb.value * 0.92 && precision === 0) {
      precision = 1;
    }
  }
  return (size / denominator.value).toFixed(precision) + denominator.label;
}
