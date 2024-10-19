export interface Link {
  load: number;
  start: string;
  end: string;
}

export interface NetworkDTO {
  nodes: string[];
  links: Link[];
}
