var agent = navigator.userAgent.toLowerCase(),
  opera = window.opera,
  browser = {
  /**
   * @property {boolean} ie 检测当前浏览器是否为IE
   * @example
   * ```js
   * if ( UE.browser.ie ) {
   *     console.log( '当前浏览器是IE' );
   * }
   * ```
   */
  ie		:  /(msie\s|trident.*rv:)([\w.]+)/.test(agent),

  /**
   * @property {boolean} opera 检测当前浏览器是否为Opera
   * @example
   * ```js
   * if ( UE.browser.opera ) {
   *     console.log( '当前浏览器是Opera' );
   * }
   * ```
   */
  opera	: ( !!opera && opera.version ),

  /**
   * @property {boolean} webkit 检测当前浏览器是否是webkit内核的浏览器
   * @example
   * ```js
   * if ( UE.browser.webkit ) {
   *     console.log( '当前浏览器是webkit内核浏览器' );
   * }
   * ```
   */
  webkit	: ( agent.indexOf( ' applewebkit/' ) > -1 ),

  /**
   * @property {boolean} mac 检测当前浏览器是否是运行在mac平台下
   * @example
   * ```js
   * if ( UE.browser.mac ) {
   *     console.log( '当前浏览器运行在mac平台下' );
   * }
   * ```
   */
  mac	: ( agent.indexOf( 'macintosh' ) > -1 ),

  /**
   * @property {boolean} quirks 检测当前浏览器是否处于“怪异模式”下
   * @example
   * ```js
   * if ( UE.browser.quirks ) {
   *     console.log( '当前浏览器运行处于“怪异模式”' );
   * }
   * ```
   */
  quirks : ( document.compatMode == 'BackCompat' )
};
