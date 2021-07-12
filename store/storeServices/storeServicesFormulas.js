const checkNaN = (number) => {
  if (number === 0) {
    return true;
  }
  return false;
};

const experienceGrade = (obj) => {
  if (checkNaN(obj.amountExperience)) {
    return 0;
  }
  return obj.experience / obj.amountExperience;
};

const waitingTimeGrade = (obj) => {
  if (checkNaN(obj.amountWaitingTime)) {
    return 0;
  }
  return obj.waitingTime / obj.amountWaitingTime;
};

const speedGrade = (obj) => {
  if (checkNaN(obj.amountSpeed)) {
    return 0;
  }
  return obj.speed / obj.amountSpeed;
};

const qualityGrade = (obj) => {
  if (checkNaN(obj.amountQuality)) {
    return 0;
  }
  return obj.quality / obj.amountQuality;
};

const bathroomGrade = (obj) => {
  if (checkNaN(obj.amountBathroom)) {
    return 0;
  }
  return obj.bathroom / obj.amountBathroom;
};

const kindnessGrade = (obj) => {
  if (checkNaN(obj.amountKindness)) {
    return 0;
  }
  return obj.kindness / obj.amountKindness;
};

const npsGrade = (obj) => {
  if (checkNaN(obj.amountNps)) {
    return 0;
  }
  return obj.nps / obj.amountNps;
};

export {
  experienceGrade, waitingTimeGrade, speedGrade,
  qualityGrade, bathroomGrade, kindnessGrade, npsGrade,
};
