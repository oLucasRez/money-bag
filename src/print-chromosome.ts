import { renderBalance } from './components/balance';
import { renderTreasure } from './components/treasure';
import { renderMoney } from './components/money';
import { Treasure } from './types';
import { delay } from './utils';

export async function printChromosome(
  chromosome: boolean[],
  treasures: Treasure[]
) {
  const maxWeight = treasures.sort((a, b) => b.weight - a.weight)[0].weight;
  const maxCost = treasures.sort((a, b) => b.cost - a.cost)[0].cost;

  let weight = 0;
  let totalWeight = 0;
  let cost = 0;

  treasures.map((treasure, i) => {
    const normWeight = treasure.weight / maxWeight;
    const normCost = treasure.cost / maxCost;

    totalWeight += treasure.weight;

    if (chromosome[i]) {
      const x = 300 + Math.random() * 200;
      const y = 300;

      weight += treasure.weight;
      cost += treasure.cost;

      renderTreasure(i, 'in', [x, y], normCost, normWeight);
    } else {
      const x = 100 + Math.random() * 600;
      const y = 500;

      renderTreasure(i, 'out', [x, y], normCost, normWeight);
    }
  });

  renderBalance(weight, totalWeight);
  renderMoney(cost);

  await delay(5);
}
