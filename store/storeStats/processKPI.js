import { getDaysArray } from '@/utils/dateFunctions';

export const processMainKpis = (baseArray) => {
  let contributionT = 0;
  let grossSaleT = 0;
  let netSaleT = 0;
  let transactionsT = 0;
  let averageTicketT = 0;

  let contributionY = 0;
  let grossSaleY = 0;
  let netSaleY = 0;
  let transactionsY = 0;
  let averageTicketY = 0;

  let contributionLW = 0;
  let grossSaleLW = 0;
  let netSaleLW = 0;
  let transactionsLW = 0;
  let averageTicketLW = 0;

  let poa = 0;

  let store;
  baseArray[0].forEach((kpi) => {
    if (kpi.category === 'TOTAL') {
      contributionT = kpi.contribution;
      grossSaleT = kpi.grossSale;
      netSaleT = kpi.netSale;
      transactionsT = kpi.transactions;
      averageTicketT = kpi.averageTicket;
      store = kpi.store;
      poa = kpi.poa;
    }
  });

  baseArray[1].forEach((kpi) => {
    if (kpi.category === 'TOTAL') {
      contributionY = kpi.contribution;
      grossSaleY = kpi.grossSale;
      netSaleY = kpi.netSale;
      averageTicketY = kpi.averageTicket;
      transactionsY = kpi.transactions;
    }
  });

  baseArray.slice(-1)[0].forEach((kpi) => {
    if (kpi.category === 'TOTAL') {
      contributionLW = kpi.contribution;
      grossSaleLW = kpi.grossSale;
      netSaleLW = kpi.netSale;
      averageTicketLW = kpi.averageTicket;
      transactionsLW = kpi.transactions;
    }
  });

  const kpis = [
    'Contribución',
    'Venta Bruta',
    'Venta Neta',
    'Ticket promedio',
    'Transacciones',
  ];

  const auxMainKpi = [];

  kpis.forEach((name) => {
    let units;
    let valueT;
    let valueY;
    let valueLW;

    if (name === 'Contribución') {
      units = '$';
      valueT = contributionT;
      valueY = contributionY;
      valueLW = contributionLW;
    } else if (name === 'Venta Bruta') {
      units = '$';
      valueT = grossSaleT;
      valueY = grossSaleY;
      valueLW = grossSaleLW;
    } else if (name === 'Venta Neta') {
      units = '$';
      valueT = netSaleT;
      valueY = netSaleY;
      valueLW = netSaleLW;
    } else if (name === 'Ticket promedio') {
      units = '';
      valueT = averageTicketT;
      valueY = averageTicketY;
      valueLW = averageTicketLW;
    } else if (name === 'Transacciones') {
      units = 'unidades';
      valueT = transactionsT;
      valueY = transactionsY;
      valueLW = transactionsLW;
    }

    const obj = {
      id: name,
      name,
      store,
      units,
      value: valueT,
      variationYNumber: valueT - valueY,
      variationLWNumber: valueT - valueLW,
      variationYpercentage: ((valueT - valueY) / valueY) * 100,
      variationLWpercentage: ((valueT - valueLW) / valueLW) * 100,
    };

    if (obj.name === 'Venta Neta') {
      obj.poa = poa;
    }

    auxMainKpi.push(obj);
  });
  return auxMainKpi;
};

export const processStoreKpis = (data) => {
  const daysArray = getDaysArray(data.dates[0], data.dates[1]);

  let baseArray = [];

  daysArray.forEach((day) => {
    const auxArray = [];
    data.data.forEach((kpi) => {
      if (new Date(kpi.date).toDateString() === day.toDateString()
      && kpi.category !== 'POA') {
        const auxKpi = kpi;
        auxKpi.averageTicket = kpi.grossSale / kpi.transactions;
        if (kpi.category === 'TOTAL') {
          const kpiPOA = data.data.find((el) => el.category === 'POA' && new Date(el.date).toDateString() === day.toDateString());
          auxKpi.poa = kpiPOA.netSale;
        }

        auxArray.push(auxKpi);
      }
    });
    if (auxArray.length !== 0) {
      baseArray.push(auxArray);
    }
  });

  baseArray = baseArray.reverse();
  if (baseArray.length === 0) {
    return undefined;
  }
  const aux = {};

  const kpis = [
    'Contribución',
    'Venta Bruta',
    'Venta Neta',
    'Ticket promedio',
    'Transacciones',
  ];

  kpis.forEach((name) => {
    aux[name] = {};
  });

  kpis.forEach((name) => {
    baseArray[0].forEach((kpi) => {
      aux[name][kpi.category] = {};
    });

    baseArray[0].forEach((kpi) => {
      let units;
      let value;
      if (name === 'Contribución') {
        units = '$';
        value = kpi.contribution;
      } else if (name === 'Venta Bruta') {
        units = '$';
        value = kpi.grossSale;
      } else if (name === 'Venta Neta') {
        units = '$';
        value = kpi.netSale;
      } else if (name === 'Ticket promedio') {
        units = '';
        value = kpi.averageTicket;
      } else if (name === 'Transacciones') {
        units = 'unidades';
        value = kpi.transactions;
      }

      aux[name][kpi.category].value = value;
      aux[name][kpi.category].units = units;
      aux[name][kpi.category].name = name;
      aux[name][kpi.category].id = name;
      aux[name][kpi.category].store = kpi.store;
      aux[name][kpi.category].category = kpi.category;
    });

    baseArray[1].forEach((kpi) => {
      let difference = '-';
      let percentage = '-';
      if (name === 'Contribución') {
        if (aux[name][kpi.category]) {
          difference = aux[name][kpi.category].value - kpi.contribution;
          percentage = (difference / kpi.contribution) * 100;
        }
      } else if (name === 'Venta Bruta') {
        if (aux[name][kpi.category]) {
          difference = aux[name][kpi.category].value - kpi.grossSale;
          percentage = (difference / kpi.grossSale) * 100;
        }
      } else if (name === 'Venta Neta') {
        if (aux[name][kpi.category]) {
          difference = aux[name][kpi.category].value - kpi.netSale;
          percentage = (difference / kpi.netSale) * 100;
        }
      } else if (name === 'Ticket promedio') {
        if (aux[name][kpi.category]) {
          difference = aux[name][kpi.category].value - kpi.averageTicket;
          percentage = (difference / kpi.averageTicket) * 100;
        }
      } else if (name === 'Transacciones') {
        if (aux[name][kpi.category]) {
          difference = aux[name][kpi.category].value - kpi.transactions;
          percentage = (difference / kpi.transactions) * 100;
        }
      }
      if (aux[name][kpi.category]) {
        aux[name][kpi.category].variationYNumber = difference;
        aux[name][kpi.category].variationYpercentage = percentage;
      }
    });

    baseArray.slice(-1)[0].forEach((kpi) => {
      let difference = '-';
      let percentage = '-';

      if (name === 'Contribución') {
        if (aux[name][kpi.category]) {
          difference = aux[name][kpi.category].value - kpi.contribution;
          percentage = (difference / kpi.contribution) * 100;
        }
      } else if (name === 'Venta Bruta') {
        if (aux[name][kpi.category]) {
          difference = aux[name][kpi.category].value - kpi.grossSale;
          percentage = (difference / kpi.grossSale) * 100;
        }
      } else if (name === 'Venta Neta') {
        if (aux[name][kpi.category]) {
          difference = aux[name][kpi.category].value - kpi.netSale;
          percentage = (difference / kpi.netSale) * 100;
        }
      } else if (name === 'Ticket promedio') {
        if (aux[name][kpi.category]) {
          difference = aux[name][kpi.category].value - kpi.averageTicket;
          percentage = (difference / kpi.averageTicket) * 100;
        }
      } else if (name === 'Transacciones') {
        if (aux[name][kpi.category]) {
          difference = aux[name][kpi.category].value - kpi.transactions;
          percentage = (difference / kpi.transactions) * 100;
        }
      }
      if (aux[name][kpi.category]) {
        aux[name][kpi.category].variationLWNumber = difference;
        aux[name][kpi.category].variationLWpercentage = percentage;
      }
    });
  });

  const mainKPI = processMainKpis(baseArray);

  const filteredData = {};
  Object.entries(aux).forEach((item) => {
    const { TOTAL, ...rest } = item[1];
    filteredData[item[0]] = rest;
  });

  const filteredArray = [];
  baseArray.forEach((item) => {
    const filtered = item.filter((elem) => elem.category !== 'TOTAL');
    filteredArray.push(filtered);
  });

  return { filteredArray, filteredData, mainKPI };
};
