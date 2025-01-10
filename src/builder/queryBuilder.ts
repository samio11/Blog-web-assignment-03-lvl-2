import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchableFields: string[]) {
    const search = this?.query?.search;
    this.modelQuery = this.modelQuery.find({
      $or: searchableFields.map((x) => ({
        [x]: { $regex: search, $options: 'i' },
      })),
    } as FilterQuery<T>);
    return this;
  }
  filter() {
    const queryObj = { ...this.query };
    const excludingImportant = ['search', 'sortOrder', 'sortBy'];
    excludingImportant.forEach((x) => delete queryObj[x]);
    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }
  sort() {
    let sortStr;
    if (this.query.sortOrder && this.query.sortBy) {
      const sortOrder = this.query.sortOrder;
      const sortBy = this.query.sortBy;
      sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
    }
    this.modelQuery = this.modelQuery.sort(sortStr);
    return this;
  }
}

export default QueryBuilder;
