import { ValueObject } from "../../core/value-object";

interface NameProps {
  value: string;
}

export class Name extends ValueObject<NameProps> {
  public static create(firstName: string): Name {
    if (firstName.length > 25)
      throw new Error("Firstname can't be above 25 caracter");
    if (firstName.length < 1)
      throw new Error("Firstname must be at least 1 caracter long");

    return new Name({ value: firstName });
  }

  private constructor(props: NameProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  toString(): string {
    return this.props.value;
  }
}
