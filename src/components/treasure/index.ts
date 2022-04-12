function randomColor() {
  const randomValue = Math.floor(Math.random() * 3);

  const values = [0, randomValue, 2].map((value) => value * 127);

  return values.sort(() => Math.random() - 0.5).join();
}

export function renderTreasure(
  i: number,
  status: 'in' | 'out',
  [x, y]: [number, number],
  normCost: number,
  normWeight: number
) {
  const id = `treasure-${i}`;

  const coords = `0,0`;

  const strokeColor = `white`;
  const backgroundColor = `rgb(${randomColor()})`;
  const backgroundFilter = `contrast(${normCost * 100}%) brightness(${
    0.5 + 0.5 * normCost
  })`;
  const brightness = `${0.1 + 0.6 * normCost}`;

  const root = document.getElementById('root');

  if (!root) throw new Error('');

  const alreadyCreated = document.getElementById(id);

  if (alreadyCreated) {
    if (alreadyCreated.classList.contains(status)) return;

    alreadyCreated.style.left = `${x - (normWeight * 100) / 2}px`;
    alreadyCreated.style.bottom = `calc(100% - ${y}px)`;
    alreadyCreated.style.transform = `rotate(${(Math.random() - 0.5) * 90}deg)`;
    alreadyCreated.classList.toggle('in');
    alreadyCreated.classList.toggle('out');

    return;
  }

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  svg.setAttribute('id', id);
  svg.classList.add(status);
  svg.setAttribute('viewBox', '-1 -12 22 18');
  svg.setAttribute('width', `${normWeight * 100}px`);
  svg.setAttribute('height', `${normWeight * 100}px`);
  svg.style.position = 'absolute';
  svg.style.left = `${x - (normWeight * 100) / 2}px`;
  svg.style.bottom = `calc(100% - ${y}px)`;
  svg.style.transform = `rotate(${(Math.random() - 0.5) * 90}deg)`;
  svg.style.zIndex = `${Math.floor(100 - normWeight * 100)}`;
  svg.style.transition = '0.2s';

  const background = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );
  background.setAttribute(
    'd',
    `M ${coords} l 10,5 l 8,-2 l 2,-10 l -11,-4 l -9,3 z`
  );
  background.setAttribute('fill', backgroundColor);
  background.setAttribute('filter', backgroundFilter);
  background.setAttribute('stroke-linejoin', 'round');

  svg.appendChild(background);

  const bright = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  bright.setAttribute('d', `M ${coords} m 7,-4 l 4,5 l 7,2 l 2,-10 l -11,-4 z`);
  bright.setAttribute('fill', 'white');
  bright.setAttribute('opacity', brightness);

  svg.appendChild(bright);

  const shadow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  shadow.setAttribute('d', `M ${coords} m 7,-4 l 4,5 l 7,2 l -8,2 l -10,-5`);
  shadow.setAttribute('fill', 'black');
  shadow.setAttribute('opacity', '0.3');

  svg.appendChild(shadow);

  const shineness = normCost > 0.5 ? Math.round((normCost - 0.5) * 10) : 0;
  for (let i = 0; i < shineness; i++) {
    const shine = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    shine.setAttribute(
      'd',
      `M ${[
        -1 + 5 + Math.random() * (22 - 5),
        -12 + 5 + Math.random() * (18 - 10),
      ].join()} m -3,0 l 2,-0.5 l 0.5,-2 l 0.5,2 l 2,0.5 l -2,0.5 l -0.5,2 l -0.5,-2 z`
    );
    shine.setAttribute('fill', 'white');
    shine.style.transform = `scale(${0.3 + Math.random() * 0.7})`;

    svg.appendChild(shine);
  }

  root.appendChild(svg);
}
