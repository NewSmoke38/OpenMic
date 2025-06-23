import { User } from "../models/user.model.js";


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token!")
    }
};



// registering a user
const registerUser = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    // Basic validation
    if (!username || !email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Save new user
    const user = new User({
      fullName,
      username,
      email,
      password,
    });

    await user.save();

    try {
      // Generate tokens
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      // Success response with tokens
      res.status(201).json({ 
        message: "User registered successfully.",
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          fullName: user.fullName
        }
      });
    } catch (tokenError) {
      console.error("Token generation error:", tokenError);
      // If token generation fails, still return success but without tokens
      res.status(201).json({ 
        message: "User registered successfully. (Token generation failed)",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          fullName: user.fullName
        }
      });
    }

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error." });
  }
};


export {
    registerUser
};
