export function renderMoney(cost: number) {
  const _cost = cost / 50;

  const id = `money`;

  const alreadyCreated = document.getElementById(id);
  if (alreadyCreated) {
    alreadyCreated.style.top = `${360 - _cost}px`;

    const stack = document.getElementById('money-stack');

    if (stack) {
      stack.style.top = `${360 - _cost}px`;
      stack.style.height = `${30 + _cost}px`;
    }

    return;
  }

  const stack = document.createElement('div');

  stack.setAttribute('id', 'money-stack');
  stack.style.position = 'absolute';
  stack.style.top = `${360 - _cost}px`;
  stack.style.left = '150px';
  stack.style.width = '100px';
  stack.style.height = `${30 + _cost}px`;
  stack.style.background = '#ABAE9A';
  stack.style.transition = '0.2s';

  document.getElementById('root')?.appendChild(stack);

  const money = document.createElement('img');

  money.setAttribute('id', id);
  money.setAttribute(
    'src',
    'https://upload.wikimedia.org/wikipedia/commons/2/23/US_one_dollar_bill%2C_obverse%2C_series_2009.jpg'
  );
  money.style.position = 'absolute';
  money.style.top = `${360 - _cost}px`;
  money.style.left = '150px';
  money.style.width = '100px';
  money.style.height = '30px';
  money.style.transition = '0.2s';

  document.getElementById('root')?.appendChild(money);
}
