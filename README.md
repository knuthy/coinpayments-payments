<h1 align="center">Coinpayments-payments</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/knuthy/coinpayments-payments#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/knuthy/coinpayments-payments/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/knuthy/coinpayments-payments/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/knuthy/coinpayments-payments" />
  </a>
  <a href="https://twitter.com/knuthdk" target="_blank">
    <img alt="Twitter: knuthdk" src="https://img.shields.io/twitter/follow/knuthdk.svg?style=social" />
  </a>
</p>

> NPM module for acquiring payments from the CoinPayments API without form authentication hassle.

## Install

```sh
npm install coinpayments-payments
```

## Usage

```javascript
const coinPayments = require('coinpayments-payments');

const payment_settings = {
	private_key: ""
	, public_key: ""
};

const payments = new coinPayments(payment_settings, function(err, result) {
	if(err) throw err;
	console.log(result);
});
```

## Author

**Knuthy**

* Twitter: [@knuthdk](https://twitter.com/knuthdk)
* Github: [@knuthy](https://github.com/knuthy)

## License

Copyright © 2020 [Knuthy](https://github.com/knuthy).<br />
This project is [MIT](https://github.com/knuthy/coinpayments-payments/blob/master/LICENSE) licensed.
