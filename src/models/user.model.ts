import config from "config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface userDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string):Promise<Boolean>
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next){
    let user = this as userDocument;

    if (!user.isModified("password")){
        return next();
    }

    const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));
    const hash = await bcrypt.hashSync(user.password, salt );
    user.password = hash;

});

UserSchema.methods.comparePassword = async function(candidatePassword: string):Promise<boolean>{
    const user = this as userDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);

};

const userModel = mongoose.model("user", UserSchema);

export default userModel;
