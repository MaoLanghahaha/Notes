**目录**
[toc]
#### JS对象
1、对象基础
:  如下所示的对象被称之为对象的字面量 (literal)————手动的写出对象的内容来创建一个对象。不同于从类实例化一个对象

: ```js
    var person = {
      name : ['Bob', 'Smith'],
      age : 32,
      gender : 'male',
      interests : ['music', 'skiing'],
      bio : function() {
        alert(this.name[0] + ' ' + this.name[1] + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
      },
      greeting: function() {
        alert('Hi! I\'m ' + this.name[0] + '.');
      }
    };
  ```
  
2、点表示法
:  * 点表示法 (dot notation) 来访问对象的属性和方法

: ```js
    person.age
    person.interests[1]
    person.bio()
  ```

3、括号表示法
:  * 括号表示法 (bracket notation) 来访问对象的属性和方法

: ```js
    person['age']
    person['interests'][1]
    person['bio']()
  ```

:  这看起来很像访问一个数组的元素，从根本上来说是一回事儿，你使用了关联了值的名字，而不是索引去选择元素。难怪对象有时被称之为关联数组 (associative array) 了——对象做了字符串到值的映射，而数组做的是数字到值的映射。

: * 括号表示法动态设置对象成员的值，动态设置成员的名字

: ```js
    var myDataName = 'height'
    var myDataValue = '1.75m'
    person[myDataName] = myDataValue
  ```
: 这是使用点表示法无法做到的，点表示法只能接受字面量的成员的名字，不接受变量作为名字

4、一直在使用对象
: > 每次我们学习的示例使用浏览器内建的 API 和 JavaScript 的一些对象时，我们就在使用对象，因为，这些功能是由跟我们所看到的对象==同样的结构来构建==的，虽然比我们自己定义的要复杂许多

: ```js
    var myString = "hahahahahahha,shshshshsh";
    myString.split(',');
  ```
  当我们这样使用字符串的方法时，其实正在使用一个字符串实例上可用的方法，你随时都可以在代码里使用字面量创建一个字符串，字符串会自动的被创建为字符串 (String) 的实例，因此会有一些常见的方法和属性可用。

  ```js
    var myDiv = document.createElement('div');
    var myVideo = document.querySelector('video');
  ```
  当这样访问 document 对象时，你正在使用Document实例上可用的方法。每个页面在加载完毕后，会有一个 Document 的实例被创建，叫做 document，它代表了整个页面的结构，内容和一些功能，比如页面的 URL。同样的，这意味 document 有一些可用的方法和属性。

  这同样适用许多其他内建的对象或 API，你使用过有—— Array，Math，等。

  请注意内建的对象或 API 不会总是自动地创建对象的实例，举例来说，这个 Notifications API——允许浏览器发起系统通知，需要你为每一个你想发起的通知都使用构造器进行实例化。尝试在 JavaScript 终端里输入以下代码

  ```js
    var myNotification = new Notification('Hello!');
  ```

#### JS面向对象
1、面向对象的程序（Object-oriented programming ，OOP）
: OOP 的基本思想是：在程序里，我们通过使用对象去构建现实世界的模型，把原本很难（或不可能）被使用的功能，简单化并提供出来，以供访问。

  对象可以包含相关的数据和代码，这些数据和代码用于表示 你所建造的模型是什么样子，以及拥有什么样的行为或功能。对象包（object package，或者叫命名空间 namespace）存储（官方用语：封装）着对象的数据（常常还包括函数），使数据的组织和访问变得更容易了；对象也常用作 数据存储体（data stores），用于在网络上运输数据，十分便捷。

  * 定义一个对象模板
: 在一些面向对象的语言中（例如Java），我们用类（class）的概念去描述一个对象（您在下面就能看到JavaScript使用了一个完全不同的术语）-类并不完全是一个对象，它更像是一个定义对象特质的==模板==。
例如：Class : Person

  * 创建一个真正的对象 （实例化）
: 当一个对象需要从类中创建出来时，类的构造函数就会运行来创建这个实例。这种创建对象的过程我们称之为==实例化==-实例对象被类实例化。
例如：Class : Person >>> Object : person1 || Object : person2

  * 具体的对象（继承）
: 在这个例子里，我们不想要泛指的人，我们想要像老师和学生这样类型更为具体的人。在 OOP 里，我们可以创建基于其它类的新类，这些新的子类可以继承它们父类的数据和功能。注：多态——这个高大上的词正是用来描述多个对象拥有实现共同方法的能力。
例如：Class : Person >>> Class : Teacher || Class : Student
![](https://mdn.mozillademos.org/files/13881/MDN-Graphics-inherited-3.png)

2、构建函数和对象
: 有些人认为 JavaScript 不是真正的面向对象的语言，比如它没有像许多面向对象的语言一样有用于创建class类的==声明==（例如Java有关键字Class）。JavaScript 用一种称为==构建函数的特殊函数==来定义对象和它们的特征。构建函数非常有用，因为很多情况下您不知道实际需要多少个对象（实例）。构建函数提供了创建您所需对象（实例）的有效方法，将对象的数据和特征函数按需联结至相应对象。

  不像“经典”的面向对象的语言，从构建函数创建的新实例的特征并非全盘复制，而是通过一个叫做==原形链==的参考链链接过去的。（参见 Object prototypes），所以这并非真正的实例，严格的讲， JavaScript 在对象间使用和其它语言的共享机制不同。

  注： “经典”的面向对象的语言并非好事，就像上面提到的，OOP 可能很快就变得非常复杂，JavaScript 找到了在不变的特别复杂的情况下利用面向对象的优点的方法。

  * 一个简单的例子
  ```js
    function Person(name) {
      this.name = name;
      this.greeting = function() {
        alert('Hi! I\'m ' + this.name + '.');
      };
    }
  ```
  这个构建函数是 ==JavaScript 版本的类==。您会发现，它只定义了对象的属性和方法，除了没有明确创建一个对象和返回任何值和之外，它有了您期待的函数所拥有的全部功能。这里使用了this关键词，即无论是该对象的哪个实例被这个构建函数创建，它的 name 属性就是传递到构建函数形参name的值，它的 greeting() 方法中也将使用相同的传递到构建函数形参name的值。

  注： 一个构建函数通常是大写字母开头，这样便于区分构建函数和普通函数。

  * 构建函数创建新的实例
  ```js
    var person1 = new Person('Bob');
    var person2 = new Person('Sarah');

    person1.name
    person1.greeting()
    person2.name
    person2.greeting()
  ```
  当新的对象被创立, 变量person1与person2有效地包含了以下值：
  ```js
    {
      name : 'Bob',
      greeting : function() {
        alert('Hi! I\'m ' + this.name + '.');
      }
    }

    {
      name : 'Sarah',
      greeting : function() {
        alert('Hi! I\'m ' + this.name + '.');
      }
    }
  ```
  值得注意的是每次当我们调用构造函数时，我们都会重新定义一遍 greeting()，这不是个理想的方法。为了避免这样，我们可以在原型里定义函数，接下来我们会讲到。

3、创建对象的其他方式
: > 到现在为止，我们了解到了两种不同的创建对象的方式 —— 声明一个对象的语法(对象字面量方式)， 与使用构造函数(回顾上面)。
  * Object()构造函数
  ```js
    var person1 = new Object();
  ```
  这样就在person1变量中存储了一个空对象。然后, 可以根据需要, 使用点或括号表示法向此对象添加属性和方法
  ```js
    person1.name = 'Chris';
    person1['age'] = 38;
    person1.greeting = function() {
      alert('Hi! I\'m ' + this.name + '.');
    }
  ```
  还可以将对象文本传递给Object() 构造函数作为参数， 以便用属性/方法填充它。
  ```js
    var person1 = new Object({
      name : 'Chris',
      age : 38,
      greeting : function() {
        alert('Hi! I\'m ' + this.name + '.');
      }
    });
  ```
  * 使用Object.create()方法
  ```js
    var person2 = Object.create(person1);
    person2.name
    person2.greeting()
  ```
  person2是基于person1创建的， 它们具有相同的属性和方法。这非常有用， 因为它允许您创建新的对象而无需定义构造函数。缺点是比起构造函数，浏览器在更晚的时候才支持create()方法（IE9,  IE8 或甚至以前相比）

  如果您不太担心对旧浏览器的支持， 并且您只是简单需要一个对象的一些副本， 那么创建一个构造函数可能会让您的代码显得过度繁杂


#### 对象原型