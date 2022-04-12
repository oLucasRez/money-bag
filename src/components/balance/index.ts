export function renderBalance(weight: number, totalWeight: number) {
  const id = 'balance-cursor';

  const alreadyCreated = document.getElementById(id);

  if (alreadyCreated) {
    if (weight <= 15)
      alreadyCreated.style.transform = `rotate(${162 * (weight / 15)}deg)`;
    else
      alreadyCreated.style.transform = `rotate(${
        162 + 18 * (weight / totalWeight)
      }deg)`;

    return;
  }

  const balanceCursor = document.createElement('div');

  balanceCursor.id = id;
  balanceCursor.style.position = 'absolute';
  balanceCursor.style.top = '372px';
  balanceCursor.style.left = '375px';
  balanceCursor.style.zIndex = '100';
  balanceCursor.style.height = '2px';
  balanceCursor.style.width = '25px';
  balanceCursor.style.background = '#333';
  balanceCursor.style.borderRadius = '64px';
  balanceCursor.style.transformOrigin = `right center`;
  if (weight <= 15)
    balanceCursor.style.transform = `rotate(${162 * (weight / 15)}deg)`;
  else
    balanceCursor.style.transform = `rotate(${
      162 + 18 * (weight / totalWeight)
    }deg)`;
  balanceCursor.style.transition = `0.2s`;

  document.getElementById('root')?.appendChild(balanceCursor);
}
