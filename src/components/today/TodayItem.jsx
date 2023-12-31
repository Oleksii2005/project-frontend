import React, { useState } from 'react';
import TodayForm from './todayForm/TodayForm';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../redux/portionOfDrinking/slicePortionOfDrinking';
import Modal from '../modalWindow/Modal';
import { activModalSelector, showModalSelector } from '../../redux/selectors';
import TodayList from './TodayList';
import {
  thunkPortionAddDrinking,
  thunkPortionOfDrinking,
} from '../../redux/portionOfDrinking/thunkPortionOfDrinking';
import EditForm from '../today/editForm/EditForm';

const Today = () => {
  const [idx] = useState('');
  const showModal = useSelector(showModalSelector);
  const dispath = useDispatch();
  const nameActivModal = useSelector(activModalSelector);
  const addPortion = value => {
    // console.log('value', value);
    const { time, counter: amount } = value;
    // const today = new Date();
    // today.setHours(15, 15);
    // const date = AM;
    console.log(time);
    if (time === '') {
      const createDate = new Date();
      const date = createDate.toISOString();
      console.log(date);
      return dispath(thunkPortionAddDrinking({ date, amount }));
    }
    const lolo = time.split(':');
    console.log(lolo);
    const hours = lolo[0];
    const minutes = lolo[1];
    // console.log('AM', d.setMonth(time));
    const createDate = new Date();
    createDate.setHours(hours);
    createDate.setMinutes(minutes);
    const date = createDate.toISOString();
    // console.log('time', time);
    dispath(thunkPortionAddDrinking({ date, amount }));

    // dispath(add(value));
  };

  const modalActiv = () => {
    if (nameActivModal === 'add') {
      return <TodayForm addPortion={addPortion} idx={idx} />;
    } else {
      return <EditForm addPortion={addPortion} />;
    }
  };
  return (
    <>
      {showModal && <Modal>{modalActiv()}</Modal>}
      <TodayList />
    </>
  );
};

export default Today;
