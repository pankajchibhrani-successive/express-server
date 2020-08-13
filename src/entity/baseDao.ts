'use strict';

import * as _ from "lodash";

import * as Models from "../entity/index";
import { Model } from "mongoose";

// Models.users

export class DAOManager {

    constructor() { }

    async saveData(model, data: any) {
        try {
            let ModelName = Models[model]
            data.createdDate = new Date()
            return await new ModelName(data).save();
        }
        catch (error) {
            console.log("saveData==========================>", error);
            return Promise.reject(error);
        }
    };

    async getData(model, query: any, projection: any, options: any) {
        try {
            let ModelName = Models[model];
            return await ModelName.find(query, projection, options);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };

    async distinct(model, path: string, query: any) {
        try {
            let ModelName = Models[model];
            return await ModelName.distinct(path, query);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };

    async findOne(model, query, projection, options) {
        try {
            let ModelName = Models[model];
            console.log("783222222222244444444446",ModelName)
            return await ModelName.findOne(query, projection, options).exec();
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };

    async findOneSort(model, query, projection, options, sort) {
        try {
            let ModelName = Models[model];
            return await ModelName.findOne(query, projection, options).sort(sort).exec();
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };


    async findAll(model, query, projection, options) {
        try {
            let ModelName = Models[model];
            return await ModelName.find(query, projection, options).exec();
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };

    async findAllWithPopulate(model, query, projection, options, populateQuery) {
        try {
            let ModelName = Models[model];
            return await ModelName.find(query, projection, options).populate(populateQuery).exec();
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };

    async find(model, query: any, projection: any, options: any, sort, paginate, populateQuery: any) {
        try {
            let ModelName = Models[model];
            if (!_.isEmpty(sort) && !_.isEmpty(paginate) && _.isEmpty(populateQuery)) { // sorting with pagination
                return await ModelName.find(query, projection, options).skip((paginate.pageNo - 1) * paginate.limit).limit(paginate.limit).sort(sort);
            } else if (_.isEmpty(sort) && !_.isEmpty(paginate) && _.isEmpty(populateQuery)) { // pagination
                return await ModelName.find(query, projection, options).skip((paginate.pageNo - 1) * paginate.limit).limit(paginate.limit);
            } else if (_.isEmpty(sort) && _.isEmpty(paginate) && !_.isEmpty(populateQuery)) { // populate
                return await ModelName.find(query, projection, options).populate(populateQuery).exec();
            } else if (_.isEmpty(sort) && !_.isEmpty(paginate) && !_.isEmpty(populateQuery)) { // pagination with populate
                return await ModelName.find(query, projection, options).skip((paginate.pageNo - 1) * paginate.limit).limit(paginate.limit).populate(populateQuery).exec();
            } else {
                return await ModelName.find(query, projection, options);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async findAllWithSkipLimitAndSort(model, query, projection, options, sort, skip, limit) {
        try {
            let ModelName = Models[model]
            return await ModelName.find(query, projection, options).sort(sort).skip(skip).limit(limit).exec();
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    };

    async findAndUpdate(model, conditions, update, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.findOneAndUpdate(conditions, update, options);
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    };

    async updateMany(model, conditions, update, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.updateMany(conditions, update, options);
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    };

    async findAndRemove(model, conditions, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.findOneAndRemove(conditions, options);
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    };

    async updateOne(model, conditions, update, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.updateOne(conditions, update, options);
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    };

    async remove(model, condition) {
        try {
            let ModelName = Models[model]
            return await ModelName.remove(condition);
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    };

    async populateData(model, query, projection, options, collectionOptions) {
        try {
            let ModelName = Models[model];
            return await ModelName.find(query, projection, options).populate(collectionOptions).exec();
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    };

    async findOneWithPopulate(model, query, projection, options, collectionOptions) {
        try {
            let ModelName = Models[model];
            return await ModelName.findOne(query, projection, options).populate(collectionOptions).exec();
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    };

    async findWithPopulate(model, query, projection, options, collectionOptions) {
        try {
            let ModelName = Models[model];
            return await ModelName.find(query, projection, options).populate(collectionOptions).exec();
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    };

    async count(model, condition) {
        try {
            let ModelName = Models[model]
            return await ModelName.countDocuments(condition);
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    };

    async aggregateData(model, aggregateArray: any, options) {
        try {
            let ModelName = Models[model]
            let aggregation = ModelName.aggregate(aggregateArray);
            if (options) { aggregation.options = options; }
            return await aggregation.exec();
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    };

    async insert(model, data, options = {}) {
        try {
            let ModelName = Models[model]
            let obj = new ModelName(data)
            await obj.save()
            return obj
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    };

    async insertMany(model, data, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.insertMany(data, options);
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    };

    async aggregateWithPopulate(model, group, populateOptions) {
        try {
            let ModelName: any = Models[model];
            let aggregate = await ModelName.aggregate(group);
            let populate = await ModelName.populate(aggregate, populateOptions);
            return populate;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    async populateDataOnAggregate(model, aggregate, populateOptions) {
        try {
            let ModelName = Models[model]
            return await ModelName.populate(aggregate, populateOptions)
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    }

    async bulkFindAndUpdate(bulk, query, update, options) {
        try {
            return await bulk.find(query).upsert().update(update, options);
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    };

    async bulkFindAndUpdateOne(bulk, query, update, options) {
        try {
            return await bulk.find(query).upsert().updateOne(update, options);
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    };

    async createIndex(model, query) {
        try {
            let ModelName = Models[model]
            return await ModelName.createIndex(query, { _id: 1 });
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
    };

    async populate(model, data: any, populateQuery: any) {
        try {
            let ModelName = Models[model];
            return await ModelName.populate(data, populateQuery);
        } catch (error) {
            console.log(error)
            return Promise.reject(error);
        }
    };

    async queryBuilder(pipeline: Array<Object>, skip: number, limit: number, page: number) {
        let q = pipeline || [];
        q.push({
            $facet: {
                data: [
                    { $skip: skip },
                    { $limit: limit },
                ],
                metadata: [{ $count: "total" }, { $addFields: { page: page } }]
            }
        });
        return q;
    }

    async paginate(model, pipeline?: Array<Object>, limit?: number, page?: number) {
        try {
            let ModelName = Models[model]
            if (limit) {
                limit = Math.abs(limit);
                if (limit > 100) {
                    limit = 100;
                }
            } else {
                limit = 10;
            }
            if (page && (page != 0)) {
                page = Math.abs(page);
            } else {
                page = 1;
            }

            let skip = (limit * (page - 1));
            const result = await ModelName.aggregate(await this.queryBuilder(pipeline, skip, limit, page));
            let next_hit = 0;
            // let next_hitt = 0;
            let total_page = (result[0]['data'].length > 0) ? Math.ceil(result[0].metadata[0].total / limit) : 0;
            if (result[0]['data'].length > limit) {
                // next_hitt = 1
                result[0]['data'].pop();
            }

            if (total_page > page) {
                next_hit = page + 1;
            }

            return {
                total: result[0]['metadata'] && result[0]['metadata'][0] ? result[0]['metadata'][0]["total"] : 0,
                page: result[0]['metadata'] && result[0]['metadata'][0] ? result[0]['metadata'][0]["page"] : page,
                total_page: total_page,
                next_hit: next_hit,
                limit: limit,
                data: result[0]['data'],
            };
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }
}