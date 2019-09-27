import bcrypt from 'bcryptjs';

async function run () {
    const salt = bcrypt.genSalt(10);    
    console.log(salt);
}

