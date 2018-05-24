export class Persona {
    public nombre: string = '';
    public email: string = '';
    public password : string = '';
    public sexo : string = '';

    constructor(name, last, age,sex)
    {
        this.nombre = name;
        this.email = last;
        this.password = age;
        this.sexo = sex;
    }
}
