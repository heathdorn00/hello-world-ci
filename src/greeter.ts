/**
 * Greeter class - Simple hello world implementation
 */
export class Greeter {
  private readonly name: string;

  constructor(name: string) {
    if (!name || name.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    this.name = name.trim();
  }

  /**
   * Returns a greeting message
   */
  greet(): string {
    return `Hello, ${this.name}!`;
  }

  /**
   * Returns a formal greeting
   */
  greetFormal(): string {
    return `Good day, ${this.name}. Welcome!`;
  }

  /**
   * Returns an enthusiastic greeting
   */
  greetEnthusiastic(): string {
    return `Hello, ${this.name}!!! So great to see you!`;
  }
}

/**
 * Simple hello world function
 */
export function sayHello(name?: string): string {
  const target = name && name.trim() ? name.trim() : 'World';
  return `Hello, ${target}!`;
}
