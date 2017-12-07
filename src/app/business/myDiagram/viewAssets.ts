export enum Shapes {
  RectangleShape = 'M 0 0 L 60 0 L 60 30 L 0 30 Z',
  RoundedRectangleShape = 'M 0 6 Q 0 0 6 0 L 54 0 Q 60 0 60 6 L 60 24 Q 60 30 54 30 L 6 30 Q 0 30 0 24 Z',
  ParallelogramShape = 'M 10 0 L 70 0 L 60 30 L 0 30 Z'
}

export enum Borders {
  SolidBorder = '',
  DashBorder = '5,5',
  MixBorder = '10,2,10'
}

export enum Colors {
  Green = '#7fcc00',
  DarkGreen = '#008000',
  Blue = '#007fcc',
  Yellow = '#CCCC00',
  // TODO: same pour le field fill:
}
