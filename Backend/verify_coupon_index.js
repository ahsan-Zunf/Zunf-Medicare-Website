const fs = require('fs');
const path = require('path');

// Load chughtai.json
const chughtaiCoupons = JSON.parse(fs.readFileSync(path.join(__dirname, 'codes', 'chughtai.json'), 'utf8'));

// Replicate the logic from couponService.js
const START_INDEX = 49;
const availableCoupons = chughtaiCoupons.slice(START_INDEX);

console.log(`Starting index: ${START_INDEX}`);
console.log(`First available coupon (index ${START_INDEX}):`, JSON.stringify(availableCoupons[0], null, 2));

// Compare with the actual 50th item (0-indexed 49)
const actual50th = chughtaiCoupons[49];
console.log(`Actual 50th item in JSON (index 49):`, JSON.stringify(actual50th, null, 2));

if (availableCoupons[0].id === actual50th.id) {
    console.log('SUCCESS: The logic correctly picks the 50th coupon.');
} else {
    console.log('FAILURE: The logic does not pick the 50th coupon.');
}
