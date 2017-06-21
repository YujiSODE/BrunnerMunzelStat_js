# BrunnerMunzelStat_js
This function estimates value of statistic used in "Brunner Munzel test" with given two sample arrays.  
https://github.com/YujiSODE/BrunnerMunzelStat_js

>Copyright (c) 2017 Yuji SODE \<yuji.sode@gmail.com\>  
>This software is released under the MIT License.  
>See LICENSE or http://opensource.org/licenses/mit-license.php
______
According to Brunner and Munzel (2000), a value of estimated statistic in this method follows the standard normal distribution asymptotically; this distribution can be approximated to *t*-distribution when *n*<sub>1</sub> and *n*<sub>2</sub> are not less than 10,  
while whole sample size *N* =*n*<sub>1</sub>+*n*<sub>2</sub>.

## Script
- `BrunnerMunzelStat_js.js`  
  Function: `BMStat(X,Y)`; `X` and `Y` are numerical arrays.

This function rettuns object with three values: `statistic`, `estP` and `df`.
- `statistic`: value of statistic
- `estP`: estimated value `P = P(X<Y)+P(X=Y)/2`
- `df`: degrees of freedom for approximation by t-distribution

## Example data cited from Brunner and Munzel (2000)
`var v1=[1,2,1,1,1,1,1,1,1,1,2,4,1,1],v2=[3,3,4,3,1,2,3,1,1,5,4];`  
`BMStat(v1,v2);`  
Result: `{ statistic: 3.1374674823029514, estP: 0.7889610389610391, df: 17.682841979481548 }`

## References and Library
### References cited
- Brunner, E. and Munzel, U. 2000. The Nonparametric Behrens-Fisher Problem: Asymptotic Theory and a Small-Sample Approximation. Biometrical Jour. vol. 42, p. 17-25.
- R Documentation [brunner.munzel.test](https://www.rdocumentation.org/packages/lawstat/versions/3.1/topics/brunner.munzel.test) derived on [2017-06-19]
- [Brunner-Munzel test \(in Japanese\)](https://oku.edu.mie-u.ac.jp/~okumura/stat/brunner-munzel.html) derived on [2017-06-19]
### Library
- stRank.js (Yuji SODE,2017): the MIT License; https://gist.github.com/YujiSODE/f913c0c2cf49353e561cd03c2a7a8a6b
