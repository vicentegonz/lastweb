function checkNaN(number) {
  if (number === 0) {
    return true;
  }
  return false;
}

export function experienceGrade(obj) {
  if (checkNaN(obj.amountExperience)) {
    return 0;
  }
  return obj.experience / obj.amountExperience;
}

export function waitingTimeGrade(obj) {
  if (checkNaN(obj.amountWaitingTime)) {
    return 0;
  }
  return obj.waitingTime / obj.amountWaitingTime;
}

export function speedGrade(obj) {
  if (checkNaN(obj.amountSpeed)) {
    return 0;
  }
  return obj.speed / obj.amountSpeed;
}

export function qualityGrade(obj) {
  if (checkNaN(obj.amountQuality)) {
    return 0;
  }
  return obj.quality / obj.amountQuality;
}

export function bathroomGrade(obj) {
  if (checkNaN(obj.amountBathroom)) {
    return 0;
  }
  return obj.bathroom / obj.amountBathroom;
}

export function kindnessGrade(obj) {
  if (checkNaN(obj.amountKindness)) {
    return 0;
  }
  return obj.kindness / obj.amountKindness;
}

export function npsGrade(obj) {
  if (checkNaN(obj.amountNps)) {
    return 0;
  }
  return obj.nps / obj.amountNps;
}
