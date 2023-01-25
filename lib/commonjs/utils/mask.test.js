"use strict";

var _mask = require("./mask");
test('should mask with number digit pattern', () => {
  const expected = '342.934.480-80x+ 3';
  const received = (0, _mask.mask)('34293448080x+ 3', '000.000.000-00x#99');
  expect(received).toBe(expected);
});
test('should mask with alpha pattern', () => {
  const expected = 'react-xnative test';
  const received = (0, _mask.mask)('react     native test', 'LLLLL-xLLLLLL?LLLL');
  expect(received).toBe(expected);
});
test('should mask with alphanumeric pattern', () => {
  const expected = 'r4t-777- -345';
  const received = (0, _mask.mask)('r4t 777 345', 'AAA-000-a-aaa');
  expect(received).toBe(expected);
});
test('should mask with currency mask', () => {
  const expected = '$59.99';
  const received = (0, _mask.mask)('5999', '', 'currency', {
    prefix: '$',
    decimalSeparator: '.',
    groupSeparator: ',',
    precision: 2
  });
  expect(received).toBe(expected);
});
test('should unMask text', () => {
  const expected = '34293448080';
  const received = (0, _mask.unMask)('342.934.480-80');
  expect(received).toBe(expected);
});
test('should unMask currency', () => {
  const expected = '5999';
  const received = (0, _mask.unMask)('$59.99', 'currency');
  expect(received).toBe(expected);
});
//# sourceMappingURL=mask.test.js.map