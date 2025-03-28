interface GridContentMap {
  type: string;
  tag?: string;
}

class IdCounter {
  private id: number = 0;
  public getId(): number {
    return this.id;
  }
  public createId(): number {
    this.id++;
    return this.id;
  }
}

class GridContent {
  protected gridContentMap: Map<string, GridContentMap> = new Map();
  protected idCounter: IdCounter = new IdCounter();
  public getGridContentId(type: string): string {
    return type + this.idCounter.getId();
  }
  public createGridContentId(type: string): string {
    return type + this.idCounter.createId();
  }
  public getGridContent(): GridContentMap[] {
    const result = [];
    for (const [key, value] of this.gridContentMap) {
      result.push({ ...value, id: key });
    }
    return result;
  }
  public getGridContentById(id: string): GridContentMap | undefined {
    return this.gridContentMap.get(id);
  }
  public addGridContent(item: GridContentMap): string {
    const id = this.createGridContentId(item.type);
    this.gridContentMap.set(id, item);
    return id;
  }
  public removeGridContent(id: string): GridContentMap[] {
    this.gridContentMap.delete(id);
    return this.getGridContent();
  }
  public hasGridContent(id: string): boolean {
    return this.gridContentMap.has(id);
  }
}
export default new GridContent();
