import bcrypt from 'bcrypt';

// Hashing a password
export const passwordHashing = async (password: string) => {
    try {
        const saltRounds = 10;
        let hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (err) {
        console.error("hashing error", err);
        return null;
    }
}

// passwordComparing function
export const passwordComparing = async (hashedPassword: string, userPassword: string) => {
    try {
        const result = await bcrypt.compare(userPassword, hashedPassword);
        if (result) {
            console.log('Passwords match!');
            return result;
        } else {
            console.log('Passwords do not match!');
            return false;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

