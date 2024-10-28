class Person {
  constructor(name, age, personality) {
    this.name = name;
    this.age = age;
    this.personality = personality;
  }
  say() {
    console.log(`${this.name}: 안녕하세요!`);
  }
}

const person1 = new Person('김희자', 30, '활기참');
console.log(person1);
person1.say();

const person2 = new Person('최아무개', 46, '호탕함');
console.log(person2);
person2.say();

class Student extends Person {
  constructor(name, age, personality, grade) {
    super(name, age, personality);
    this.grade = grade;
  }
  say() {
    console.log(`${this.name}: 리액트의 특징으로는 첫째로 컴포넌트 기반 개발, 두 번째로 선언적 프로그래밍, 그리고 마지막으로...`);
  }
  study() {
    console.log(`${this.name}: 공부 중...`);
  }
}

const student1 = new Student('공부왕', 23, '우울함', 'A-');
console.log(student1);
student1.say();
student1.study();
