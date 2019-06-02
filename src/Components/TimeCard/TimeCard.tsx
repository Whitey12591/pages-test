import React from 'react';
import { Eta } from '../../Data/cta_dto';

import moment from 'moment';

interface IProps {
  eta: Eta;
}

const TimeCard = (props: IProps) => {
  const { eta } = props;
  const { arrT, prdt } = eta;

  var now = moment.utc(prdt).format('DD/MM/YYYY HH:mm:ss');
  var then = moment.utc(arrT).format('DD/MM/YYYY HH:mm:ss');

  return (
    <li>
      {moment
        .utc(moment(then, 'DD/MM/YYYY HH:mm:ss').diff(moment(now, 'DD/MM/YYYY HH:mm:ss')))
        .format('mm')}
    </li>
  );
};

export default TimeCard;
