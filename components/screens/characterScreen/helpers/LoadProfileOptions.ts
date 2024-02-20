import { HunterProfile } from "../ICharacter";

const profileList: HunterProfile[] = require(`../../../../storage/hunter.json`);

const LoadProfileOptions = () => {
  const optionsProfile = profileList.map((profile) => ({
    label: profile.name,
    value: profile.profile_id,
  }));

  return {
    profileList,
    optionsProfile,
  };
};

export default LoadProfileOptions;
