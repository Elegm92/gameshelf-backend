import User from "./User.js";
import GameList from "./GameList.js";
import Review from "./Review.js";
import Like from "./Like.js";

//relaciones
User.hasMany(GameList, { foreignKey: "userId" });
GameList.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Like, { foreignKey: "userId" });
Like.belongsTo(User, { foreignKey: "userId" });

Review.hasMany(Like, { foreignKey: "reviewId" });
Like.belongsTo(Review, { foreignKey: "reviewId" });

export { User, GameList, Review, Like };
