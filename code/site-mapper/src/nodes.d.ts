export type Crawl = {
    nodes: Node[],
    edges: Edge[]
}

export type Node = PageNode | ExternalNode;

export type PageNode = {
    type: "page",
    url: string,
    status: "ok" | "error"
}

export type ExternalNode = {
    type: "external",
    url: string,
}

export type Edge = {
    from: string,
    to: string,
    type: "link" | "nav"
}