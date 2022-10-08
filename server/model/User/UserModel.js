const mongoose = require('mongoose')

//CREATE USER SCHEMA
const userSchema = new mongoose.Schema(
    {
        fullName: {
            required: [true, "First name is required"],
            type: String,
        },
        profession: {
            required: [true, "Profession is required"],
            type: String,
        },
        phone: {
            required: [true, "Mobile number is required"],
            type: Number,
        },
        profilePhoto: {
            type: String,
            default:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        },
        email: {
            type: String,
            required: [true, "Email is required"]
        },
        password: {
            type: String,
            required: [true, " Password is required"],
        },
        refreshTokens : {
            type: Array,
            default: [],
        },
        roles: {
            type: [],
            //enum: ["Admin", "Guest", "User"],
            default:["User"]
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);
//Compile schema into model
const User = mongoose.model("User", userSchema);

module.exports = User;
