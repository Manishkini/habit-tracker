const changeStatus = (currDate, currrentStaus, habitId, habitDetailsId) => {
  fetch('/habit/changeStatus', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: currrentStaus,
      currDate: currDate,
      habitId: habitId,
      habitDetailsId: habitDetailsId,
    }),
  })
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      console.log('err', err);
    });
};
