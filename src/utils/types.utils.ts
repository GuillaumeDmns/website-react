export interface Nodes {
  id: string;
  name: string;
  val: number;
}

export interface Links {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: Array<Nodes>;
  links: Array<Links>;
}
