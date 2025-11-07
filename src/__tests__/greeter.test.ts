import { Greeter, sayHello } from '../greeter';

describe('Greeter', () => {
  describe('constructor', () => {
    it('should create a greeter with valid name', () => {
      const greeter = new Greeter('Alice');
      expect(greeter).toBeInstanceOf(Greeter);
    });

    it('should trim whitespace from name', () => {
      const greeter = new Greeter('  Bob  ');
      expect(greeter.greet()).toBe('Hello, Bob!');
    });

    it('should throw error for empty name', () => {
      expect(() => new Greeter('')).toThrow('Name cannot be empty');
    });

    it('should throw error for whitespace-only name', () => {
      expect(() => new Greeter('   ')).toThrow('Name cannot be empty');
    });
  });

  describe('greet', () => {
    it('should return basic greeting', () => {
      const greeter = new Greeter('Charlie');
      expect(greeter.greet()).toBe('Hello, Charlie!');
    });

    it('should work with different names', () => {
      const greeter1 = new Greeter('Dave');
      const greeter2 = new Greeter('Eve');
      expect(greeter1.greet()).toBe('Hello, Dave!');
      expect(greeter2.greet()).toBe('Hello, Eve!');
    });
  });

  describe('greetFormal', () => {
    it('should return formal greeting', () => {
      const greeter = new Greeter('Frank');
      expect(greeter.greetFormal()).toBe('Good day, Frank. Welcome!');
    });

    it('should maintain formality for different names', () => {
      const greeter = new Greeter('Grace');
      expect(greeter.greetFormal()).toContain('Good day');
      expect(greeter.greetFormal()).toContain('Welcome');
    });
  });

  describe('greetEnthusiastic', () => {
    it('should return enthusiastic greeting', () => {
      const greeter = new Greeter('Henry');
      expect(greeter.greetEnthusiastic()).toBe('Hello, Henry!!! So great to see you!');
    });

    it('should be more enthusiastic than basic greet', () => {
      const greeter = new Greeter('Ivy');
      const basic = greeter.greet();
      const enthusiastic = greeter.greetEnthusiastic();
      expect(enthusiastic.length).toBeGreaterThan(basic.length);
      expect(enthusiastic).toContain('!!!');
    });
  });
});

describe('sayHello', () => {
  it('should return "Hello, World!" with no argument', () => {
    expect(sayHello()).toBe('Hello, World!');
  });

  it('should return greeting with provided name', () => {
    expect(sayHello('Jack')).toBe('Hello, Jack!');
  });

  it('should trim whitespace from name', () => {
    expect(sayHello('  Kate  ')).toBe('Hello, Kate!');
  });

  it('should default to World for empty string', () => {
    expect(sayHello('')).toBe('Hello, World!');
  });

  it('should default to World for whitespace-only string', () => {
    expect(sayHello('   ')).toBe('Hello, World!');
  });
});
