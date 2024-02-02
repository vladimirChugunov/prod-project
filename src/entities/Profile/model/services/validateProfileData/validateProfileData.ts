import { Profile } from 'entities/Profile';
import { ValidateProfileError } from '../../types/profile';

export const validateProfileData = (profile?: Profile) => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }

    const {
        first, lastname, username,
    } = profile;

    const errors: ValidateProfileError[] = [];

    if (!first || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }

    if (!username) {
        errors.push(ValidateProfileError.INCORRECT_USER_NAME);
    }

    return errors;
};
