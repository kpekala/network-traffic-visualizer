export interface Link {
  label: string;
  node1: string;
  node2: string;
}

export interface Node {
  name: string;
}

export interface NetworkDTO {
  nodes: Node[];
  links: Link[];
}
