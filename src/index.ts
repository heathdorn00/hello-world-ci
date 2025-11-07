import { Greeter, sayHello } from './greeter';

// Simple CLI usage
const name = process.argv[2];

if (name) {
  const greeter = new Greeter(name);
  console.log(greeter.greet());
  console.log(greeter.greetFormal());
} else {
  console.log(sayHello());
}
