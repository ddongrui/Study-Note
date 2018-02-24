/**
 * Created by dongrui on 2018/2/24.
 * 在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用implements语句
 */
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);