import round from '@/utils/round';
import {
  experienceGrade,
  waitingTimeGrade,
  speedGrade,
  qualityGrade,
  bathroomGrade,
  kindnessGrade,
  npsGrade,
} from './storeServicesFormulas';

const makeIndicator = (obj) => {
  const { date } = obj;
  const experience = experienceGrade(obj);
  const waitingTime = waitingTimeGrade(obj);
  const speed = speedGrade(obj);
  const quality = qualityGrade(obj);
  const bathroom = bathroomGrade(obj);
  const kindness = kindnessGrade(obj);
  const nps = npsGrade(obj);
  const service = experience * 0.125
      + waitingTime * 0.175
      + speed * 0.175
      + quality * 0.175
      + bathroom * 0.175
      + kindness * 0.175;

  const finalObj = {
    experience,
    waitingTime,
    speed,
    quality,
    bathroom,
    kindness,
    service,
    nps,
    date,
  };

  return finalObj;
};

const processKSI = (data) => {
  const indicators = [];
  data.data.forEach((obj) => {
    indicators.push(makeIndicator(obj));
  });

  indicators.reverse();

  if (indicators.length === 0) {
    return undefined;
  }

  let yesterdayAvailable = true;
  let lwAvailable = true;

  if (indicators.length === 1) {
    yesterdayAvailable = true;
    lwAvailable = true;
  } else {
    const today = new Date(data.endDate);
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const lastWeek = new Date(data.startDate);

    const dataToday = new Date(indicators[0].date);
    const dataYesterday = new Date(indicators[1].date);
    const dataLW = new Date(indicators.slice(-1)[0].date);

    if (dataToday.getDate() !== today.getDate()) {
      return undefined;
    }

    if (dataYesterday.getDate() !== yesterday.getDate()) {
      yesterdayAvailable = false;
    }

    if (dataLW.getDate() !== lastWeek.getDate()) {
      lwAvailable = false;
    }
  }

  const mainService = {
    name: 'Nota Final',
    id: 'mainService',
    value: indicators[0].service,
    data: indicators.map(({ service }) => round(service, 2)),
    variationYNumber: yesterdayAvailable ? (indicators[0].service - indicators[1].service)
      : undefined,
    variationLWNumber: lwAvailable
      ? indicators[0].service - indicators.slice(-1)[0].service : undefined,
    variationYpercentage: yesterdayAvailable
      ? (((indicators[0].service - indicators[1].service) / indicators[1].service) * 100)
      : undefined,
    variationLWpercentage: lwAvailable
      ? (
        (indicators[0].service - indicators.slice(-1)[0].service)
          / indicators.slice(-1)[0].service
      ) * 100 : undefined,
  };

  const npsService = {
    name: 'NPS',
    id: 'nps',
    value: indicators[0].nps,
    data: indicators.map(({ nps }) => round(nps, 2)),
    variationYNumber: yesterdayAvailable ? (indicators[0].nps - indicators[1].nps) : undefined,
    variationLWNumber: lwAvailable
      ? indicators[0].nps - indicators.slice(-1)[0].nps : undefined,
    variationYpercentage: yesterdayAvailable
      ? (((indicators[0].nps - indicators[1].nps) / indicators[1].nps) * 100) : undefined,
    variationLWpercentage: lwAvailable
      ? (
        (indicators[0].nps - indicators.slice(-1)[0].nps)
        / indicators.slice(-1)[0].nps
      ) * 100 : undefined,
  };

  const serviceNames = [
    'Experiencia',
    'Tiempo de espera',
    'Velocidad',
    'Calidad',
    'Baño',
    'Amabilidad',
  ];

  const aux = [];

  serviceNames.forEach((name) => {
    const serviceArray = [];

    if (name === 'Experiencia') {
      indicators.forEach((obj) => {
        serviceArray.push(obj.experience);
      });
    } else if (name === 'Tiempo de espera') {
      indicators.forEach((obj) => {
        serviceArray.push(obj.waitingTime);
      });
    } else if (name === 'Velocidad') {
      indicators.forEach((obj) => {
        serviceArray.push(obj.speed);
      });
    } else if (name === 'Calidad') {
      indicators.forEach((obj) => {
        serviceArray.push(obj.quality);
      });
    } else if (name === 'Baño') {
      indicators.forEach((obj) => {
        serviceArray.push(obj.bathroom);
      });
    } else if (name === 'Amabilidad') {
      indicators.forEach((obj) => {
        serviceArray.push(obj.kindness);
      });
    }

    const subService = {
      name,
      id: name,
      value: round(serviceArray[0], 2),
      data: serviceArray.map((service) => round(service, 2)),
      variationYNumber: yesterdayAvailable ? (serviceArray[0] - serviceArray[1]) : undefined,
      variationLWNumber: lwAvailable
        ? serviceArray[0] - serviceArray.slice(-1)[0] : undefined,
      variationYpercentage: yesterdayAvailable
        ? (((serviceArray[0] - serviceArray[1]) / serviceArray[1]) * 100) : undefined,
      variationLWpercentage: lwAvailable ? (
        (serviceArray[0] - serviceArray.slice(-1)[0])
        / serviceArray.slice(-1)[0]
      ) * 100 : undefined,
    };

    aux.push(subService);
  });
  return { mainService, npsService, aux };
};

export default processKSI;
