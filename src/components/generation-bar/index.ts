export function renderGenerationBar(
  currentGeneration: number,
  totalGenerations: number
) {
  const generation = document.getElementById('generation');

  const alreadyCreated = document.getElementById('generation-bar');

  if (alreadyCreated) {
    alreadyCreated.style.width = `${
      (100 * currentGeneration) / totalGenerations
    }%`;

    return;
  }

  const generationBar = document.createElement('div');

  generationBar.id = 'generation-bar';
  generationBar.style.height = '100%';
  generationBar.style.width = `${
    (100 * currentGeneration) / totalGenerations
  }%`;
  generationBar.style.borderRadius = `64px`;
  generationBar.style.background = `red`;

  generation?.appendChild(generationBar);
}
