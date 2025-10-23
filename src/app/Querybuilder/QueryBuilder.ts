import { Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Search by name
  search() {
    const searTerm = this.query.searchTerm as string;
    if (searTerm) {
      this.modelQuery = this.modelQuery.find({
        name: searTerm,
      });
    }
    return this;
  }

  // Filter by Hourly Rate
  filter() {
    const queryObject = { ...this.query };
    const excludeFields = ["searchTerm"];
    excludeFields.forEach((field) => delete queryObject[field]);
    if (queryObject.minHourlyRate && queryObject.maxHourlyRate) {
      queryObject.hourlyRate = {
        $gt: Number(queryObject.minHourlyRate),
        $lt: Number(queryObject.maxHourlyRate),
      };
      delete queryObject.minHourlyRate;
      delete queryObject.maxHourlyRate;
    }
    if (queryObject.rating) {
      queryObject.rating = Number(queryObject.rating);
    }
    this.modelQuery = this.modelQuery.find(queryObject);
    return this;
  }

  countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const totalDocuments = this.modelQuery.model.countDocuments(totalQueries);
    return totalDocuments;
  }
}

export default QueryBuilder;
