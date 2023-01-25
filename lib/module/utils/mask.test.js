import { mask, unMask } from './mask';
test('should mask with number digit pattern', () => {
  const expected = '342.934.480-80x+ 3';
  const received = mask('34293448080x+ 3', '000.000.000-00x#99');
  expect(received).toBe(expected);
});
test('should mask with alpha pattern', () => {
  const expected = 'react-xnative test';
  const received = mask('react     native test', 'LLLLL-xLLLLLL?LLLL');
  expect(received).toBe(expected);
});
test('should mask with alphanumeric pattern', () => {
  const expected = 'r4t-777- -345';
  const received = mask('r4t 777 345', 'AAA-000-a-aaa');
  expect(received).toBe(expected);
});
test('should mask with currency mask', () => {
  const expected = '$59.99';
  const received = mask('5999', '', 'currency', {
    prefix: '$',
    decimalSeparator: '.',
    groupSeparator: ',',
    precision: 2
  });
  expect(received).toBe(expected);
});
test('should unMask text', () => {
  const expected = '34293448080';
  const received = unMask('342.934.480-80');
  expect(received).toBe(expected);
});
test('should unMask currency', () => {
  const expected = '5999';
  const received = unMask('$59.99', 'currency');
  expect(received).toBe(expected);
});
//# sourceMappingURL=mask.test.js.map