import  {
    MaxLength,
    MinLength,
    IsEmail,
    IsString,
    Matches,
    validate,
    ValidationError
} from 'class-validator';
const bcrypt = require('bcrypt');

const _saltRounds = 10;

async function makeHash(txt): Promise<any> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(txt, _saltRounds, function(err, hash) {
            if(err) reject(err);
            resolve(hash);
        });
    });
}

export async function setPassword(txt: string, user: User) {
    try {
        let cyph: any;
        const pass = new Password(txt)
        const errors: string|ValidationError[] = await validate(pass);
        if(errors.length > 0) throw new Error(
            ["Password must contain at least one number, lowercase letter, and uppercase letter\n",
            "Password must be at least 10 characters long.\n"].join('\n'));
        
        cyph = await makeHash(txt);
        if(typeof cyph !== "string") throw cyph;
        user.hash = cyph;
    } catch (e) {
        throw new Error(e);
    }
}

class Password {
    constructor(txt) {
        this.text = txt;
    }
    @MinLength(10)
    @Matches(/[a-z]/)
    @Matches(/[A-Z]/)
    @Matches(/\d/)
    text: string;
}
export class User {
    constructor(data) {
        this.name = data.name;
        this.email = data.email;
    }

    @MinLength(2)
    @MaxLength(120)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    hash: string;
}