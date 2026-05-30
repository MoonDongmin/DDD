const sayGreeting = (greeting: string) => (name: string) =>
  console.log(`${greeting} ${name}`);

const sayHello: (name: string) => void = sayGreeting('Hello');
const sayGoodbye: (name: string) => void = sayGreeting("Goodbye");

sayHello("Alex");
sayGoodbye("Allex");