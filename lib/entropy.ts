export function calculateEntropy(logprobs: number[]) {
    const probs = logprobs.map((lp) => Math.exp(lp));
  
    const total = probs.reduce((a, b) => a + b, 0);
  
    const normalized = probs.map((p) => p / total);
  
    let entropy = 0;
  
    for (const p of normalized) {
      entropy -= p * Math.log(p + 1e-10);
    }
  
    return entropy;
  }
  
  export function confidenceFromLogprob(logprob: number) {
    return Math.exp(logprob);
  }