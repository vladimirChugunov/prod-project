export {
    Profile,
    ProfileSchema,
} from './model/types/profile';

export {
    profileAction,
    profileReducer,
} from './model/slice/profileSlice';

export {
    fetchProfileData,
} from '../Profile/model/services/fetchProfileData/fetchProfileData';

export {
    ProfileCard,
} from '../Profile/ui/ProfileCard/ProfileCard';
