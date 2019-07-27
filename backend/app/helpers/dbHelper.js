module.exports = {

    /**
     *
     * @param model : Pass Model Name
     * @param query : Query  Object
     * @param options : Options Like selecting particular column
     * @param callback
     * @returns {Promise<void>}
     */

    find: async (model, query,options,callback) => {
         return await model.find(query,options,callback);
        // return new Promise(function(resolve, reject){
        //     resolve(model.find(query,options,callback));
        //
        // });

    },

    /**
     *
     * @param model
     * @param conditions
     * @param options
     * @param callback
     * @returns {Promise<void>}
     */

    findOneDelete: async (model, conditions,options, callback) => {

            model.findOneAndDelete(conditions,options,callback);
    },

}

// Create and Update Query
// model.findOne(where).then(function (data) {
//     if (!data) {
//         model.create(query).then(function (data) {
//             //console.log(data);
//             resolve(data);
//         }).catch(e => {
//             console.log(e.message);
//             reject(data);
//         });
//
//     } else {
//         model.update(newItem, where).then(function (data) {
//             resolve(data);
//         }).catch(e => {
//             console.log(e.message);
//             reject(data);
//         });
//
//     }
// });
