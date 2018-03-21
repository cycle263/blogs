## [ECMAScript 6](./ES6)

* 字面对象  

    `{test: test}` => `{test}`

* 类class

    ```
    function Song(title, artist, duration) {
      this.title = title;
      this.artist = artist;
      this.duration = duration;
      this.isPlaying = false;
    }

    Song.prototype.start = function start() {
      this.isPlaying = true;
    };
    ```

    es6写法：

    ```
    class Song {
      constructor(title, artist, duration) {
        this.title = title;
        this.artist = artist;
        this.duration = duration;
        this.isPlaying = false;
      }

      start() {
        this.isPlaying = true;
      }
    }
    ```

* 默认值

    `constructor(title, isPlaying = false)`

* 接口

    ES5写法:

    ```
    function Media(title, duration) {
      this.title = title;
      this.duration = duration;
      this.isPlaying = false;
    }


    Media.prototype.start = function start() {
      this.isPlaying = true;
    };

    Media.prototype.stop = function stop() {
      this.isPlaying = false;
    };

    function Song(title, artist, duration) {
      Media.call(this, title, duration);
      this.artist = artist;
    }

    Song.prototype = Object.create(Media.prototype);

    function Movie(title, year, duration) {
      Media.call(this, title, duration);
      this.year = year;
    }

    Movie.prototype = Object.create(Media.prototype);
    ```

    ES6的写法(extends和super关键字):

    ```
    class Media {
      constructor(title, duration, isPlaying = false) {
        this.title = title;
        this.duration = duration;
        this.isPlaying = isPlaying;
      }

      start() {
        this.isPlaying = true;
      }

      stop() {
        this.isPlaying = false;
      }
    }

    class Song extends Media {
      constructor(title, artist, duration, isPlaying = false) {
        super(title, duration, isPlaying);
        this.artist = artist;
      }
    }

    class Movie extends Media {
      constructor(title, year, duration, isPlaying = false) {
        super(title, duration, isPlaying);
        this.year = year;
      }
    }
    ```

* 箭头函数

    ```
    btnEle.onclick = function(event){
        console.log(arguments);
    };
    ```

    ES6写法:

    ```
    btnEle.onclick = (event) => {
        console.log(arguments);
    };
    ```

* let和const关键字

    - let定义的变量处于块级作用域，特别适合在循环语句中使用  

    - const常量申明，一旦申明就不要进行修改

* 模板字符串

    模板字符串用\`开头和结尾，变量则用${}包括

* destructuring取值

    ```
    var person = {
      firstName: "Andrew",
      lastName: "Chalkley"
    }

    var {firstName, lastName} = person;
    ```

    ```
    var person = {
      firstName: "Andrew",
      lastName: "Chalkley"
    }

    function getFirstName({lastName: first}) {
      return first;
    }

    getFirstName(person);   //“Chalkley”
    ```

* 扩展运算符(省略号)

    ```
    var runners = ["Mary", "Andrew", "Craig", "Michael", "Kenneth", "Dave"];

    function getLosers(first, second, third, ...losers) {
      return losers;
    }

    getLosers(...runners);
    ```
