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

function makeIndicator(obj) {
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
  };

  return finalObj;
}

export default function processKSI(data) {
  const indicators = [];
  data.forEach((obj) => {
    indicators.push(makeIndicator(obj));
  });

  const mainService = {
    name: 'Nota Final',
    id: 'mainService',
    value: indicators[0].service,
    data: indicators.map(({ service }) => round(service, 2)),
    variationYNumber: indicators[1] ? (indicators[1].service - indicators[0].service) : 0,
    variationLWNumber: indicators.slice(-1)[0].service - indicators[0].service,
    variationYpercentage: indicators[1]
      ? (((indicators[1].service - indicators[0].service) / indicators[1].service) * 100) : 0,
    variationLWpercentage:
        (
          (indicators.slice(-1)[0].service - indicators[0].service)
          / indicators.slice(-1)[0].service
        ) * 100,
  };

  const npsService = {
    name: 'NPS',
    id: 'nps',
    value: round(indicators[0].nps, 2),
    data: indicators.map(({ nps }) => round(nps, 2)),
    variationYNumber: indicators[1] ? (indicators[1].nps - indicators[0].nps) : 0,
    variationLWNumber: indicators.slice(-1)[0].nps - indicators[0].nps,
    variationYpercentage: indicators[1]
      ? (((indicators[1].nps - indicators[0].nps) / indicators[1].nps) * 100) : 0,
    variationLWpercentage:
      (
        (indicators.slice(-1)[0].nps - indicators[0].nps)
        / indicators.slice(-1)[0].nps
      ) * 100,
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
      variationYNumber: serviceArray[1] ? (serviceArray[1] - serviceArray[0]) : 0,
      variationLWNumber: serviceArray.slice(-1)[0] - serviceArray[0],
      variationYpercentage: serviceArray[1]
        ? (((serviceArray[1] - serviceArray[0]) / serviceArray[1]) * 100) : 0,
      variationLWpercentage: (
        (serviceArray.slice(-1)[0] - serviceArray[0])
        / serviceArray.slice(-1)[0]
      ) * 100,
    };

    aux.push(subService);
  });
  return { mainService, npsService, aux };
}
