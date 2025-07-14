import User from '../model/userModel.js';

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    const {email} = userData;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const savedUser = await userData.save();
    return res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}




export const fetch = async (req, res) => {
  try {
    
   const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}


export const update = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById({_id:userId});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error"
    });
  }
}


export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById({_id: userId});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   const deleteUser = await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: "User deleted successfully", user: deleteUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}