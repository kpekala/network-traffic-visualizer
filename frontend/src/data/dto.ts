export interface Link {
  label: string;
  start: string;
  end: string;
}

export interface NetworkDTO {
  nodes: string[];
  links: Link[];
}
