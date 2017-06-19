/*BrunnerMunzelStat_js
* BrunnerMunzelStat_js.js
*
*    Copyright (c) 2017 Yuji SODE <yuji.sode@gmail.com>
*
*    This software is released under the MIT License.
*    See LICENSE or http://opensource.org/licenses/mit-license.php
*/
//This function estimates value of statistic used in "Brunner Munzel test" with given two sample arrays.
/*
* Returned object has three values: statistic, estP and df.
* - statistic: value of statistic
* - estP: estimated value P = P(X<Y)+P(X=Y)/2
* - df: degrees of freedom for approximation by t-distribution
*/
//X and Y are numerical arrays.
function BMStat(X,Y){
    var slf=window,
        x=slf.JSON.parse(slf.JSON.stringify(X)),
        y=slf.JSON.parse(slf.JSON.stringify(Y)),
        xy=slf.JSON.parse("["+x.join()+","+y.join()+"]"),
        Nx=x.length,Ny=y.length,N=Nx+Ny,
        /*
        * xRkObj,yRkObj and xyRkObj are rank objects for x, y and xy, respectively.
        * rank data of x in rank object O: O[x]=[rank,count,true rank].
        * => rank of x: O[x][2].
        */
        rk,S2,avgRk,xRkObj,yRkObj,xyRkObj,
        s2X=0,s2Y=0,sigmaX2=0,sigmaY2=0,sigma2=0,
        /*
        * - (rkX|rkY) is averaged rank of (x|y) in xy
        * - pEst: estimated value P = P(X<Y)+P(X=Y)/2
        * - w: value of statistic
        */
        rkX=0,rkY=0,pEst=0,w=0;
    //============================================================================
    /* ====== "stRank.js" Copyright (c) 2017 Yuji SODE <yuji.sode@gmail.com> ======
    *    This software is released under the MIT License. See LICENSE or http://opensource.org/licenses/mit-license.php
    *    https://gist.github.com/YujiSODE/f913c0c2cf49353e561cd03c2a7a8a6b
    */
    //it returns a rank object available for the statistical rank test, by a given array A.
    rk=function(A){var i=0,j=0,s=0,Oe,N=A.length,O={},slf=window,B=slf.JSON.parse(slf.JSON.stringify(A)).sort(function(a,b){return a-b;});while(i<N){if(!O[B[i]]){O[B[i]]=[i+1,1,i+1];}else{O[B[i]][1]+=1;}i+=1;}for(var el in O){Oe=O[el];if(Oe[1]>1){j=0,s=0;while(j<Oe[1]){s+=Oe[0]+j,j+=1;}Oe[2]=s/Oe[1];}}return O;};
    /* ====== "stRank.js" Copyright (c) 2017 Yuji SODE (the MIT License) ======*/
    /*
    * this function returns averaged rank of A; the rank defined by rank object
    * - A: numerical array
    * - rkObj: rank object
    */
    avgRk=function(A,rkObj){
        var i=0,s=0,n=A.length;
        while(i<n){s+=!rkObj[A[i]]?0:+rkObj[A[i]][2],i+=1;}
        return (n>0)?s/n:0;
    };
    //============================================================================
    //xRkObj,yRkObj and xyRkObj are rank objects for x, y and xy, respectively
    xRkObj=rk(x),yRkObj=rk(y),xyRkObj=rk(xy);
    //(rkX|rkY) is averaged rank of (x|y) in xy
    rkX=avgRk(x,xyRkObj);
    rkY=avgRk(y,xyRkObj);
    //pEst: estimated value P = P(X<Y)+P(X=Y)/2
    pEst=(rkY-(Ny+1)/2)/Nx;
    /*
    * - A: numerical array
    * - rkAll: rank object in whole sample
    * - rk: rank object in a sample A
    */
    S2=function(A,rkAll,rk){
        var n=A.length,s=0,s0=0,i=0,avRk=avgRk(A,xyRkObj);
        while(i<n){
            s0=+rkAll[A[i]][2]-rk[A[i]][2]-avRk+(n+1)/2;
            s+=s0*s0;
            i+=1;
        }
        return s/(n-1);
    }
    s2X=S2(x,xyRkObj,xRkObj);
    s2Y=S2(y,xyRkObj,yRkObj);
    sigmaX2=s2X/(Ny*Ny);
    sigmaY2=s2Y/(Nx*Nx);
    sigma2=N*((sigmaX2/Nx)+(sigmaY2/Ny));
    //=== value of statistic w ===
    //w=(rkY-rkX)/(Math.sqrt(N)*Math.sqrt(sigma2));
    w=Math.sqrt(N)*(pEst-0.5)/Math.sqrt(sigma2);
    /*
    * returned object has three values:
    * - statistic: value of statistic
    * - estP: estimated value P = P(X<Y)+P(X=Y)/2
    * - df: degrees of freedom for approximation by t-distribution
    */
    //to do: df
    return {statistic:w,estP:pEst,df:0};
}
/*
* === References cited ===
* - Brunner, E. and Munzel, U. 2000. The Nonparametric Behrens-Fisher Problem: Asymptotic Theory and a Small-Sample Approximation. Biometrical Jour. vol. 42, p. 17-25.
* - [brunner.munzel.test](https://www.rdocumentation.org/packages/lawstat/versions/3.1/topics/brunner.munzel.test) derived on [2017-06-19]
* - [Brunner-Munzel test \(in Japanese\)](https://oku.edu.mie-u.ac.jp/~okumura/stat/brunner-munzel.html) derived on [2017-06-19]
* === Library ===
* - stRank.js (Yuji SODE,2017): the MIT License; https://gist.github.com/YujiSODE/f913c0c2cf49353e561cd03c2a7a8a6b
*/
//example
//var v1=[1,2,1,1,1,1,1,1,1,1,2,4,1,1],v2=[3,3,4,3,1,2,3,1,1,5,4];
//BMStat(v1,v2);
//{ statistic: 3.1374674823029514, estP: 0.7889610389610391, df: 0 }