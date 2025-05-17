interface ToolResponseContentItem {
  text: string;
  // add other props if any
}

export interface ToolResponse {
  content: ToolResponseContentItem[];
}
