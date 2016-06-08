module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    // description: DataTypes.STRING

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    item_quantity : DataTypes.INTEGER,
    // cart_id : { 
    //   type : DataTypes.INTEGER,
    //   allowNull : true,
    //   unique : false
    // },
    

  });

  return Item;
}


// // models/tag.js
// module.exports = function(sequelize, DataTypes){
//     var Tag = sequelize.define('Tag', {
//         name : DataTypes.STRING
//     }, {
//         classMethods : {
//             associate : function(models) {
//                 Tag.belongsToMany(models.Post, {
//                     through : { 
//                         model : models.Posttag
//                     },
//                     foreignKey : 'tag_id'
//                 });
//             }
//         }
//     });

//     return Tag;
// };

// models/Posttag.js
// module.exports = function(sequelize, DataTypes){
//     var Posttag = sequelize.define('Posttag', {
//         tag_id : {
//             type : DataTypes.INTEGER
//         },
//         post_id : {
//             type : DataTypes.INTEGER
//         }
//     });

//     return Posttag;
// };

// // models/post.js
// module.exports = function(sequelize, DataTypes){
//     var Post = sequelize.define('Post', {
//         text : DataTypes.STRING
//     }, {
//         classMethods : {
//             associate : function(models){
//                 Post.belongsToMany(models.Tag, {
//                     through : {
//                         model : models.Posttag
//                     },
//                     foreignKey : 'post_id',
//                     constraints : false
//                 });
//             }
//         }
//     });
//     return Post;
// };