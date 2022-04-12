// ---------------------------------------------------------------------< types
import { printChromosome } from './print-chromosome';
import { Treasure } from './types';
import { geneticAlgorithm } from './utils';
// ============================================================================
const populationSize = 40;
const chromosomeSize = 30;

const minCost = 100;
const maxCost = 1000;
const minWeight = 0.5;
const maxWeight = 5;

const population: boolean[][] = [];

for (let i = 0; i < populationSize; i++) {
  population[i] = [];

  for (let j = 0; j < chromosomeSize; j++)
    population[i][j] = Math.random() < 0.5;
}

const treasures: Treasure[] = [];

for (let i = 0; i < chromosomeSize; i++)
  treasures.push({
    cost: minCost + Math.random() * (maxCost - minCost),
    weight: minWeight + Math.random() * (maxWeight - minWeight),
  });

function fitness(chromosome: boolean[]) {
  let cost = 0;
  let weight = 0;

  chromosome.map((allele, i) => {
    if (allele) {
      cost += treasures[i].cost;
      weight += treasures[i].weight;
    }
  });

  if (weight > 15) return -weight;

  return cost;
}

const button = document.getElementById('start');

printChromosome([], treasures);

if (button) {
  button.onclick = async () => {
    const best = await geneticAlgorithm<boolean>(population, fitness, {
      renewalAmount: 10,
      mutationTax: 0.3,
      mutationSpread: 15,
      generations: 3000,
      mutationIntensity: 15,
      print: (population) => printChromosome(population[0], treasures),
    });

    best && printChromosome(best, treasures);
  };
}
