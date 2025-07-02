import { Message } from "../models/message.model.js";

const createMessage = async (req, res) => {
    try {
        const { content } = req.body;
        const author = req.body.author || "Anonymous";
        const authorId = req.body.authorId || "000000000000000000000000"; 

        if (!content) {
            return res.status(400).json({ message: "Message content is required." });
        }

    const message = new Message({
            content,
            author,
            authorId
        });

        
        await message.save();

        res
        .status(201)
        .json({ message: "Message created successfully.", data: message });

    }  catch (err) {
        console.error("Create Message Error:", err);
        res
        .status(500)
        .json({ message: "Server error." });
    }
};



const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res
        .status(200)
        .json({ messages });


    } catch (err) {
        console.error("Get Messages Error:", err);
        res.status(500).json({ message: "Server error." });
    }
};



const editMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        if (!content) {
            return res
            .status(400)
            .json({ message: "Message content is required." });
        }


    const message = await Message.findByIdAndUpdate(
            id,
            { content },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({ message: "Message not found." });
        }

        res
        .status(200)
        .json({ message: "Message updated successfully.", data: message });


}   catch (err) {
        console.error("Update Message Error:", err);
        res
        .status(500)
        .json({ message: "Server error." });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findByIdAndDelete(id);

        if (!message) {
            return res.status(404).json({ message: "Message not found." });
        }



        res
        .status(200)
        .json({ message: "Message deleted successfully." });


    } catch (err) {
        console.error("Delete Message Error:", err);
        res.status(500).json({ message: "Server error." });
    }
};

const likeMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body; // Get userId from request body
        
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        // Check if user is logged in (not anonymous)
        if (userId === "000000000000000000000000") {
            return res.status(401).json({ message: "Please log in to like messages." });
        }

        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ message: "Message not found." });
        }

        const userLiked = message.likedBy.includes(userId);
        
        if (userLiked) {
            // Unlike: remove user from likedBy and decrease likes count
            message.likedBy = message.likedBy.filter(id => id.toString() !== userId);
            message.likes = Math.max(0, message.likes - 1);
        } else {
            // Like: add user to likedBy and increase likes count
            message.likedBy.push(userId);
            message.likes = message.likes + 1;
        }

        await message.save();

        res.status(200).json({ 
            message: userLiked ? "Message unliked successfully." : "Message liked successfully.", 
            data: message,
            userLiked: !userLiked // Return the new state
        });

    } catch (err) {
        console.error("Toggle Like Message Error:", err);
        res.status(500).json({ message: "Server error." });
    }
};

export { 
    createMessage,
     getMessages, 
     editMessage,
      deleteMessage,
      likeMessage
     }; 