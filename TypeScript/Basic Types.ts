/**
 * Created by dongrui on 2018/2/24.
 */
//1.布尔值 boolean
let isDone: boolean = false;
//let isDone22: BooLean = false;  //可编译
/*let isDone3: BOoLean3 = false; //编译出错*/


//2.数字 number
//TypeScript里的所有数字都是浮点数。 这些浮点数的类型是number
//TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量
let decLiteral:number = 6;
let hexLiteral : number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;


//3.字符串 string
//可以使用双引号（"）或单引号（'）表示字符串。
let name1: string = "bob";
name1 = "smith";
//还可以使用模版字符串，它可以定义多行文本和内嵌表达式。
// 这种字符串是被反引号包围（`），并且以${ expr }这种形式嵌入表达式
let name2: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name2 }.

I'll be ${ age + 1 } years old next month.`;


//4.数组 在元素类型后面接上[] 或者 Array<元素类型>
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

//5.元组 Tuple
//元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
//x = [10, 'hello']; // Error

//当访问一个已知索引的元素，会得到正确的类型：
console.log(x[0].substr(1)); // OK
//console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

//当访问一个越界的元素，会使用联合类型替代
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
//x[6] = true; // Error, 布尔不是(string | number)类型


//6.枚举 enum
//enum类型是对JavaScript标准数据类型的一个补充
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

//默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。
enum Color2 {Red = 1, Green, Blue}
let c2: Color2 = Color2.Green;

//全部都采用手动赋值
enum Color3 {Red = 1, Green = 2, Blue = 4}
let c3: Color3 = Color3.Green;

//枚举类型提供的一个便利是你可以由枚举的值得到它的名字。
//例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字
enum Color4 {Red = 1, Green, Blue}
let colorName: string = Color4[2];
alert(colorName);  // 显示'Green'因为上面代码里它的值是2


//7.任意值 any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

//Object类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法
let notSure2: any = 4;
notSure2.ifItExists(); // okay, ifItExists might exist at runtime
notSure2.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
let prettySure: Object = 4;
//prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.

//当你只知道一部分数据的类型时，any类型也是有用的
let listAny: any[] = [1, true, "free"];
listAny[1] = 100;


//8.空值 any
//void类型像是与any类型相反，它表示没有任何类型。
//当一个函数没有返回值时，你通常会见到其返回值类型是void
function warnUser(): void {
    alert("This is my warning message");
}

//声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
let unusable: void = undefined;
//let unusable2: void = 1; //Error: Type 'number' is not assignable to type 'void'.

//9.Null和Undefined 两者各自有自己的类型分别叫做undefined和null
//默认情况下null和undefined是所有类型的子类型。就是说你可以把null和undefined赋值给number类型的变量。
//let u: undefined = undefined; //Error: Cannot find name 'undefined'.
//let n: null = null; //Error: Invalid left-hand side of assignment expression.
//当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自
//在某处你想传入一个string或null或undefined，你可以使用联合类型string | null | undefined


//10.Never 表示的是那些永不存在的值的类型
//never类型是任何类型的子类型，也可以赋值给任何类型
//没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使any也不可以赋值给never
// 返回never的函数必须存在无法达到的终点
/*
//Error: Cannot find name 'never'.
function error(message: string): never {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}*/

//11.类型断言(没有运行时的影响，只是在编译阶段起作用)
//类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。
// 其一是“尖括号”语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
//另一个为as语法 当你在TypeScript里使用JSX时，只有as语法断言是被允许的。
let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;
