class ArgSystem implements IArgSystem {
  steps;
  patternsBase;
  objective;
  baseEvidences;
}

interface IArgSystem {
  steps: Step[];
  patternsBase: Object;
  objective: Object;
  baseEvidences: Object[];
}

interface Step {
  id: string;
  patternId: string;
  evidenceRoles: Object[];
  strategy: Object;
  conclusion: Object;
}
