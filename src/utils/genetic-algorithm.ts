// ---------------------------------------------------------------------< utils
import { addUnique, getRandom } from '.';
import { renderGenerationBar } from '../components/generation-bar';
// ---------------------------------------------------------------------< types
import { MaybePromise } from '../types';

interface Options<Allele> {
  renewalAmount?: number;
  mutationTax?: number;
  mutationSpread?: number;
  mutationIntensity?: number;
  generations?: number;
  print?(population: Allele[][]): MaybePromise<void>;
}
// ============================================================================
function tournament<Allele>(
  population: Allele[][],
  fitness: (chromosome: Allele[]) => number
) {
  const [chr1, chr2, chr3, chr4] = population.sort(() => Math.random() - 0.5);

  const dad = fitness(chr1) > fitness(chr2) ? chr1 : chr2;
  const mom = fitness(chr3) > fitness(chr4) ? chr3 : chr4;

  return { dad, mom };
}

function mutate<Allele>(population: Allele[][], options: Options<Allele>) {
  const { mutationTax, mutationSpread, mutationIntensity } = options;

  if (
    mutationTax === undefined ||
    mutationSpread === undefined ||
    mutationIntensity === undefined
  )
    return;

  if (Math.random() < mutationTax) return;

  const alleles: Allele[] = [];

  population.map((chromosome) =>
    chromosome.map((allele) => addUnique(alleles, allele))
  );

  for (let i = 0; i < mutationSpread; i++) {
    const j = Math.floor(Math.random() * population.length);

    for (let l = 0; l < mutationIntensity; l++) {
      const k = Math.floor(Math.random() * population[0].length);

      population[j][k] = getRandom(alleles);
    }
  }
}

function sex<Allele>(dad: Allele[], mom: Allele[], renewalAmount: number) {
  const kids: Allele[][] = [];

  for (let i = 0; i < renewalAmount; i++) {
    const cut = Math.round(Math.random() * dad.length);

    const kid: Allele[] = [];

    for (let i = 0; i < dad.length; i++) kid.push(i < cut ? dad[i] : mom[i]);

    kids.push(kid);
  }

  return kids;
}

function validateArgs<Allele>(
  population: Allele[][],
  fitness: (chromosome: Allele[]) => number,
  options: Required<Options<Allele>>
) {
  const populationSize = population.length;

  if (!populationSize) throw new Error('População vazia');

  const chromosomeSize = population[0].length;

  if (population.some((chromosome) => chromosome.length !== chromosomeSize))
    throw new Error('A população possui cromossomos com tamanhos diferentes');

  if (!chromosomeSize) throw new Error('Os cromossomos não possuem alelos');

  if (!fitness) throw new Error('Necessária função fitness');

  const { renewalAmount, mutationTax, mutationSpread, mutationIntensity } =
    options;

  if (populationSize - renewalAmount < 4)
    throw new Error(
      'A quantidade de renovação precisa ser pelo menos 4 unidades menor que o tamanho da população'
    );

  if (0 > mutationTax || mutationTax > 1)
    throw new Error('A taxa de mutação precisa ser entre 0 e 1');

  if (mutationSpread < 0)
    throw new Error('O alcance da mutação não pode ser negativo');

  if (mutationSpread > populationSize)
    throw new Error(
      'O alcance da mutação precisa ser no máximo o tamanho da população'
    );

  if (mutationIntensity < 0)
    throw new Error('A intensidade da mutação não pode ser negativa');

  if (mutationIntensity > chromosomeSize)
    throw new Error(
      'A intensidade da mutação precisa ser no máximo o tamanho do cromossomo'
    );
}

export async function geneticAlgorithm<Allele>(
  population: Allele[][],
  fitness: (chromosome: Allele[]) => number,
  options: Options<Allele> = {}
) {
  let generation = [...population];

  const {
    renewalAmount = 1,
    mutationTax = 0.1,
    mutationSpread = 3,
    mutationIntensity = 5,
    generations = 5000,
    print = () => {},
  } = options;

  validateArgs(generation, fitness, {
    renewalAmount,
    mutationTax,
    mutationSpread,
    mutationIntensity,
    generations,
    print,
  });

  let timeout = generations;
  while (true) {
    generation = generation.sort((a, b) => fitness(b) - fitness(a));

    renderGenerationBar(generations - timeout, generations);
    await print?.(generation);

    for (let i = 0; i < renewalAmount; i++) generation.pop();

    if (!timeout--) break;

    const { dad, mom } = tournament(generation, fitness);

    const kids = sex(dad, mom, renewalAmount);

    mutate(generation, { mutationTax, mutationSpread, mutationIntensity });

    generation.push(...kids);
  }

  return generation.shift();
}
